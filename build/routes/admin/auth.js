"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const safeRoutes_1 = require("../../config/safeRoutes");
const ActiveSession_1 = require("../../models/ActiveSession");
const User_1 = require("../../models/User");
const database_1 = require("../../server/database");
const auth_1 = require("../../controllers/auth");
const auth_2 = require("../../services/auth");
// eslint-disable-next-line new-cap
exports.authRouter = express_1.default.Router();
// Route: <HOST>:PORT/api/users/
const userSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().min(4).max(15)
        .optional(),
    password: joi_1.default.string().required(),
    avatar_url: joi_1.default.string().uri().optional(),
    first_name: joi_1.default.string(),
    last_name: joi_1.default.string(),
    country: joi_1.default.string().optional(),
    bio: joi_1.default.string().optional(),
    user_role: joi_1.default.number().optional(),
});
const userUpdate = joi_1.default.object().keys({
    email: joi_1.default.string().email().optional(),
    username: joi_1.default.string().min(4).max(15)
        .optional(),
    password: joi_1.default.string().optional(),
    avatar_url: joi_1.default.string().uri().optional(),
    first_name: joi_1.default.string().optional(),
    last_name: joi_1.default.string().optional(),
    country: joi_1.default.string().optional().optional(),
    bio: joi_1.default.string().optional().optional(),
    user_role: joi_1.default.number().optional(),
});
exports.authRouter.post('/register', (req, res) => {
    // Joy Validation
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    const { email, password } = req.body;
    const userRepository = database_1.connection.getRepository(User_1.User);
    userRepository.findOne({ email }).then((user) => {
        if (user) {
            res.json({ success: false, msg: 'Email already exists' });
        }
        else {
            bcryptjs_1.default.genSalt(10, (_err, salt) => {
                bcryptjs_1.default.hash(password, salt).then((hash) => {
                    const query = {
                        ...req.body,
                        password: hash,
                    };
                    userRepository.save(query).then((u) => {
                        res.json({ success: true, userID: u.id, msg: 'The user was successfully registered' });
                    });
                });
            });
        }
    });
});
exports.authRouter.post('/login', (req, res) => {
    // Joy Validation
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    const { email } = req.body;
    const { password } = req.body;
    const userRepository = database_1.connection.getRepository(User_1.User);
    const activeSessionRepository = database_1.connection.getRepository(ActiveSession_1.ActiveSession);
    userRepository.findOne({ email }).then((user) => {
        if (!user) {
            return res.json({ success: false, msg: 'Wrong credentials' });
        }
        if (!user.password) {
            return res.json({ success: false, msg: 'No password' });
        }
        bcryptjs_1.default.compare(password, user.password, (_err2, isMatch) => {
            if (isMatch) {
                if (!process.env.SECRET) {
                    throw new Error('SECRET not provided');
                }
                const token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }, process.env.SECRET, {
                    expiresIn: 86400, // 1 week
                });
                const query = { user, token };
                activeSessionRepository.save(query);
                // Delete the password (hash)
                user.password = undefined;
                return res.json({
                    success: true,
                    token,
                    user,
                });
            }
            return res.json({ success: false, msg: 'Wrong credentials' });
        });
    });
});
exports.authRouter.post('/logout', safeRoutes_1.checkToken, auth_1.logout);
exports.authRouter.post('/checkSession', safeRoutes_1.checkToken, (req, res) => {
    const { sessionData } = req;
    res.json({
        success: true,
        session: sessionData,
    });
});
exports.authRouter.post('/all', safeRoutes_1.checkToken, (_req, res) => {
    const userRepository = database_1.connection.getRepository(User_1.User);
    userRepository.find({}).then((users) => {
        users = users.map((item) => {
            const x = item;
            x.password = undefined;
            return x;
        });
        res.json({ success: true, users });
    }).catch(() => res.json({ success: false }));
});
exports.authRouter.post('/edit', safeRoutes_1.checkToken, async (req, res) => {
    // Validate the request body
    const result = userUpdate.validate(req.body);
    if (result.error) {
        return res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
    }
    // Extract session data
    const { sessionData } = req;
    if (!sessionData || !sessionData.token) {
        return res.status(401).json({
            success: false,
            msg: 'Unauthorized',
        });
    }
    try {
        // Update the user
        const updateResult = await (0, auth_2.updateUser)(sessionData.user.id, req.body);
        if (!updateResult.success) {
            // Handle error from updateUser
            return res.status(400).json({
                success: false,
                msg: updateResult.error || 'Failed to update user',
            });
        }
        // Return the updated user object
        return res.json({
            success: true,
            user: updateResult.data,
        });
    }
    catch (error) {
        // Handle unexpected errors
        console.error('Error updating user:', error);
        return res.status(500).json({
            success: false,
            msg: 'Internal server error',
        });
    }
});
exports.authRouter.post('/edit-password', safeRoutes_1.checkToken, async (req, res) => {
    // Joi schema to validate the incoming payload
    const passwordSchema = joi_1.default.object().keys({
        confirmedPassword: joi_1.default.string().required(),
        currentPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string().required(),
    });
    // Validate the request body
    const result = passwordSchema.validate(req.body);
    if (result.error) {
        return res.status(422).json({
            success: false,
            msg: `Validation error: ${result.error.details[0].message}`,
        });
    }
    const { currentPassword, newPassword, confirmedPassword } = req.body;
    // Check if new password matches the confirmed password
    if (newPassword !== confirmedPassword) {
        return res.status(400).json({
            success: false,
            msg: 'New password and confirmation password do not match',
        });
    }
    // Extract user from session data
    const { sessionData } = req;
    const userRepository = database_1.connection.getRepository(User_1.User);
    try {
        const user = await userRepository.findOne({ id: sessionData.user.id });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found',
            });
        }
        // Check if the current password is correct
        const isCurrentPasswordMatch = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isCurrentPasswordMatch) {
            return res.status(406).json({
                success: false,
                msg: 'Incorrect current password',
            });
        }
        // Ensure new password is different from the old password
        const isNewPasswordDifferent = !await bcryptjs_1.default.compare(newPassword, user.password);
        if (!isNewPasswordDifferent) {
            return res.status(400).json({
                success: false,
                msg: 'New password must be different from the old password',
            });
        }
        // Hash new password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hash = await bcryptjs_1.default.hash(newPassword, salt);
        // Update user's password
        await userRepository.update({ id: sessionData.user.id }, { password: hash });
        res.json({
            success: true,
            msg: 'Password updated successfully',
        });
    }
    catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({
            success: false,
            msg: 'Internal server error',
        });
    }
});
// Used for tests (nothing functional)
exports.authRouter.get('/testme', (_req, res) => {
    res.status(200).json({ success: true, msg: 'all good' });
});
//# sourceMappingURL=auth.js.map