"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../models/User"); // Adjust the path as necessary
const interpretDatabaseError_1 = require("../../utils/interpretDatabaseError");
const updateUser = async (id, data) => {
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    try {
        const user = await userRepository.findOne(id);
        if (!user) {
            return { success: false, data: null, error: 'User not found' };
        }
        userRepository.merge(user, data);
        const updatedUser = await userRepository.save(user);
        return { success: true, data: updatedUser, error: null };
    }
    catch (error) {
        const interpretedError = (0, interpretDatabaseError_1.interpretDatabaseError)(error);
        return { success: false, data: null, error: interpretedError };
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=updateUser.js.map