import { getRepository } from 'typeorm';
import { Setting } from '../../models/Setting'; // Adjust the path as necessary
import { interpretDatabaseError } from '../../utils/interpretDatabaseError';
import { v4 as uuidv4 } from 'uuid';

type SettingType = {
    id: string;
    name: string;
    value: string;
    scope: 'public' | 'secret' | 'dev';
    created_at: string;
    updated_at: string;
    updated_by: string;
};

export const updateSettings = async (data: Partial<SettingType>[]) => {
    const settingRepository = getRepository(Setting);
    try {
        // Fetch all current settings
        const [currentSettings, count] = await settingRepository.findAndCount();

        // Remove all current settings
        if (count > 0) {
            await settingRepository.remove(currentSettings);
        }

        // Assign UUIDs and default values to new settings
        const mockUserUUID = uuidv4(); // Replace with the actual user UUID
        const newSettings = data.map(setting => ({
            ...setting,
            id: uuidv4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updated_by: setting.updated_by || mockUserUUID, // Use mock UUID or provide actual user UUID
        }));

        // Bulk insert new settings
        await settingRepository.save(newSettings);

        return { success: true, data: newSettings, error: null };
    } catch (error) {
        const interpretedError = interpretDatabaseError(error);
        return { success: false, data: null, error: interpretedError };
    }
};
