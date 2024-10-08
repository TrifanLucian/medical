"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuestion = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Question_1 = require("./Question");
let UserQuestion = class UserQuestion {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserQuestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], UserQuestion.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Question_1.Question),
    __metadata("design:type", Question_1.Question)
], UserQuestion.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], UserQuestion.prototype, "is_correct", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserQuestion.prototype, "answered_at", void 0);
UserQuestion = __decorate([
    (0, typeorm_1.Entity)()
], UserQuestion);
exports.UserQuestion = UserQuestion;
//# sourceMappingURL=UserQuestion.js.map