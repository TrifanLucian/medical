"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = void 0;
const typeorm_1 = require("typeorm");
const Setting_1 = require("../../models/Setting"); // Adjust the path as necessary
const interpretDatabaseError_1 = require("../../utils/interpretDatabaseError");
const uuid_1 = require("uuid");
const updateSettings = async (data) => {
    const settingRepository = (0, typeorm_1.getRepository)(Setting_1.Setting);
    try {
        // Fetch all current settings
        const [currentSettings, count] = await settingRepository.findAndCount();
        // Remove all current settings
        if (count > 0) {
            await settingRepository.remove(currentSettings);
        }
        // Assign UUIDs and default values to new settings
        const mockUserUUID = (0, uuid_1.v4)(); // Replace with the actual user UUID
        const newSettings = data.map(setting => ({
            ...setting,
            id: (0, uuid_1.v4)(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updated_by: setting.updated_by || mockUserUUID, // Use mock UUID or provide actual user UUID
        }));
        // Bulk insert new settings
        await settingRepository.save(newSettings);
        return { success: true, data: newSettings, error: null };
    }
    catch (error) {
        const interpretedError = (0, interpretDatabaseError_1.interpretDatabaseError)(error);
        return { success: false, data: null, error: interpretedError };
    }
};
exports.updateSettings = updateSettings;
//# sourceMappingURL=updateSettings.js.map