import bcrypt from 'bcryptjs';
import express from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import { checkToken } from '../../../config/safeRoutes';
import { ActiveSession } from '../../../models/ActiveSession';
import { User } from '../../../models/User';
import { connection } from '../../../server/database';
import { logout } from '../../../controllers/auth';
import {updateUser} from '../../../services/auth';
// eslint-disable-next-line new-cap
export const authRouter = express.Router();
// Route: <HOST>:PORT/api/users/

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().min(4).max(15)
    .optional(),
  password: Joi.string().required(),
  avatar_url: Joi.string().uri().optional(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  country: Joi.string().optional(),
  bio: Joi.string().optional(),
  user_role: Joi.number().optional(),
});

const userUpdate = Joi.object().keys({
  email: Joi.string().email().optional(),
  username: Joi.string().min(4).max(15)
      .optional(),
  password: Joi.string().optional(),
  avatar_url: Joi.string().uri().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  country: Joi.string().optional().optional(),
  bio: Joi.string().optional().optional(),
  user_role: Joi.number().optional(),
});

authRouter.post('/register', (req, res) => {
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

  const userRepository = connection!.getRepository(User);

  userRepository.findOne({ email }).then((user) => {
    if (user) {
      res.json({ success: false, msg: 'Email already exists' });
    } else {
      bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash(password, salt).then((hash) => {
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

authRouter.post('/login', (req, res) => {
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

  const userRepository = connection!.getRepository(User);
  const activeSessionRepository = connection!.getRepository(ActiveSession);
  userRepository.findOne({ email }).then((user) => {
    if (!user) {
      return res.json({ success: false, msg: 'Wrong credentials' });
    }

    if (!user.password) {
      return res.json({ success: false, msg: 'No password' });
    }

    bcrypt.compare(password, user.password, (_err2, isMatch) => {
      if (isMatch) {
        if (!process.env.SECRET) {
          throw new Error('SECRET not provided');
        }

        const token = jwt.sign({
          id: user.id,
          username: user.username,
          email: user.email,
        }, process.env.SECRET, {
          expiresIn: 86400, // 1 week
        });
        const query = { user, token };

        activeSessionRepository.save(query);
        // Delete the password (hash)
        (user as { password: string | undefined }).password = undefined;
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

authRouter.post('/logout', checkToken, logout);

authRouter.post('/checkSession', checkToken, (req, res) => {
  const { sessionData } = req as any;
  res.json({
    success: true,
    session: sessionData,
  });
});

authRouter.post('/all', checkToken, (_req, res) => {
  const userRepository = connection!.getRepository(User);

  userRepository.find({}).then((users) => {
    users = users.map((item) => {
      const x = item;
      (x as { password: string | undefined }).password = undefined;
      return x;
    });
    res.json({ success: true, users });
  }).catch(() => res.json({ success: false }));
});

authRouter.post('/edit', checkToken, async (req, res) => {
  // Validate the request body
  const result = userUpdate.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
  }

  // Extract session data
  const { sessionData } = req as any;
  if (!sessionData || !sessionData.token) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized',
    });
  }

  try {
    // Update the user
    const updateResult = await updateUser(sessionData.user.id, req.body);
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
  } catch (error) {
    // Handle unexpected errors
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
});

authRouter.post('/edit-password', checkToken, async (req, res) => {
  // Joi schema to validate the incoming payload
  const passwordSchema = Joi.object().keys({
    confirmedPassword: Joi.string().required(),
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
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
  const { sessionData } = req as any;

  const userRepository = connection!.getRepository(User);

  try {
    const user = await userRepository.findOne({ id: sessionData.user.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
      });
    }

    // Check if the current password is correct
    const isCurrentPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordMatch) {
      return res.status(406).json({
        success: false,
        msg: 'Incorrect current password',
      });
    }

    // Ensure new password is different from the old password
    const isNewPasswordDifferent = !await bcrypt.compare(newPassword, user.password);
    if (!isNewPasswordDifferent) {
      return res.status(400).json({
        success: false,
        msg: 'New password must be different from the old password',
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // Update user's password
    await userRepository.update({ id: sessionData.user.id }, { password: hash });

    res.json({
      success: true,
      msg: 'Password updated successfully',
    });

  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
});

// Used for tests (nothing functional)
authRouter.get('/testme', (_req, res) => {
  res.status(200).json({ success: true, msg: 'all good' });
});
