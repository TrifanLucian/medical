"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (data, page, limit, count) => ({
    data,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
    count,
});
exports.paginate = paginate;
//# sourceMappingURL=pagination.js.map