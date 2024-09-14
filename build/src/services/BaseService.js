"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const pagination_1 = require("../utils/pagination");
const database_1 = require("../server/database");
class BaseService {
    constructor(entity, relations = [], queryRelations = {}) {
        if (!database_1.connection) {
            throw new Error('Database connection not established');
        }
        this.repository = database_1.connection.getRepository(entity);
        this.relations = relations;
        this.queryRelations = queryRelations;
    }
    async create(data) {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
    async read(id, relationDepth = 'default') {
        const relations = this.queryRelations[relationDepth] || this.relations;
        const options = { relations };
        return this.repository.findOne(id, options);
    }
    async update(id, data) {
        await this.repository.update(id, data);
        return this.read(id);
    }
    async delete(id) {
        var _a;
        const result = await this.repository.delete(id);
        return ((_a = result.affected) !== null && _a !== void 0 ? _a : 0) > 0;
    }
    async list(page, limit, filters = [], relationDepth = 'default') {
        const relations = this.queryRelations[relationDepth] || this.relations;
        const options = {
            relations,
            skip: (page - 1) * limit,
            take: limit,
            where: this.buildWhereClause(filters),
        };
        const [result, total] = await this.repository.findAndCount(options);
        return (0, pagination_1.paginate)(result, page, limit, total);
    }
    buildWhereClause(filters) {
        const where = {};
        filters.forEach(filter => {
            where[filter.field] = filter.value;
        });
        return where;
    }
    getRelations() {
        return this.relations;
    }
    getQueryRelations() {
        return this.queryRelations;
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map