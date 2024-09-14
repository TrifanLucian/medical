"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/User");
const Role_1 = require("../../models/Role");
const ActiveSession_1 = require("../../models/ActiveSession");
const database_1 = require("../../server/database");
const constants_1 = require("../../constants");
const createUserWithToken = async (userData) => {
    const userRole = constants_1.DEFAULT_ROLE;
    const userRepository = database_1.connection.getRepository(User_1.User);
    const activeSessionRepository = database_1.connection.getRepository(ActiveSession_1.ActiveSession);
    const roleRepository = database_1.connection.getRepository(Role_1.Role);
    const { login: username, email } = userData;
    let requiredUser = null;
    const user = await userRepository.findOne({ username });
    const role = await roleRepository.findOne({ name: userRole });
    if (!role) {
        throw new Error(`no role exists for ${userRole} in db`);
    }
    if (user) {
        requiredUser = user;
    }
    else {
        const query = {
            username,
            email,
            user_role: role.id,
        };
        const u = await userRepository.save(query);
        requiredUser = u;
    }
    if (!process.env.SECRET) {
        throw new Error('SECRET not provided');
    }
    if (requiredUser) {
        const token = jsonwebtoken_1.default.sign({
            id: requiredUser.id,
            username: requiredUser.username,
        }, process.env.SECRET, {
            expiresIn: 86400, // 1 week
        });
        const query = { userId: requiredUser.id, token };
        activeSessionRepository.save(query);
        requiredUser.token = token;
    }
    return requiredUser;
};
exports.createUserWithToken = createUserWithToken;
//# sourceMappingURL=createUserWithToken.js.map