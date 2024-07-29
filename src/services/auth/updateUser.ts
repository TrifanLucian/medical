import { getRepository } from 'typeorm';
import { User } from '../../models/User'; // Adjust the path as necessary
import { interpretDatabaseError } from '../../utils/interpretDatabaseError';

export const updateUser = async (id: string, data: Partial<User>) => {
    const userRepository = getRepository(User);
    try {
        const user = await userRepository.findOne(id);
        if (!user) {
            return { success: false, data: null, error: 'User not found' };
        }

        userRepository.merge(user, data);
        const updatedUser = await userRepository.save(user);
        return { success: true, data: updatedUser, error: null };
    } catch (error) {
        const interpretedError = interpretDatabaseError(error);
        return { success: false, data: null, error: interpretedError };
    }
};
