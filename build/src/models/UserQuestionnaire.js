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
exports.UserQuestionnaire = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Questionnaire_1 = require("./Questionnaire");
let UserQuestionnaire = class UserQuestionnaire {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserQuestionnaire.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], UserQuestionnaire.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Questionnaire_1.Questionnaire),
    __metadata("design:type", Questionnaire_1.Questionnaire)
], UserQuestionnaire.prototype, "questionnaire", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserQuestionnaire.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserQuestionnaire.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserQuestionnaire.prototype, "completed_at", void 0);
UserQuestionnaire = __decorate([
    (0, typeorm_1.Entity)()
], UserQuestionnaire);
exports.UserQuestionnaire = UserQuestionnaire;
//# sourceMappingURL=UserQuestionnaire.js.map