"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const typeorm_1 = require("typeorm");
let Setting = class Setting {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Setting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Setting.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Setting.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['public', 'secret', 'dev'],
    }),
    __metadata("design:type", String)
], Setting.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Setting.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Setting.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Setting.prototype, "updated_by", void 0);
Setting = __decorate([
    (0, typeorm_1.Entity)()
], Setting);
exports.Setting = Setting;
//# sourceMappingURL=Setting.js.map