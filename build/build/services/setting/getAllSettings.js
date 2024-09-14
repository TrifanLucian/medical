"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSettings = void 0;
const typeorm_1 = require("typeorm");
const Setting_1 = require("../../models/Setting"); // Adjust the path as necessary
const pagination_1 = require("../../utils/pagination");
const getAllSettings = async (page = 1, limit = 10, scope) => {
    const zoneRepository = (0, typeorm_1.getRepository)(Setting_1.Setting);
    const queryBuilder = zoneRepository.createQueryBuilder('setting');
    if (scope) {
        queryBuilder.where('setting.scope = :scope', { scope });
    }
    const [data, totalRecords] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
    return (0, pagination_1.paginate)(data, page, limit, totalRecords);
};
exports.getAllSettings = getAllSettings;
//# sourceMappingURL=getAllSettings.js.map