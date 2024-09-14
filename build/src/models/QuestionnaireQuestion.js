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
exports.QuestionnaireQuestion = void 0;
const typeorm_1 = require("typeorm");
const Questionnaire_1 = require("./Questionnaire");
const Question_1 = require("./Question");
let QuestionnaireQuestion = class QuestionnaireQuestion {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuestionnaireQuestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Questionnaire_1.Questionnaire),
    __metadata("design:type", Questionnaire_1.Questionnaire)
], QuestionnaireQuestion.prototype, "questionnaire", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Question_1.Question),
    __metadata("design:type", Question_1.Question)
], QuestionnaireQuestion.prototype, "question", void 0);
QuestionnaireQuestion = __decorate([
    (0, typeorm_1.Entity)()
], QuestionnaireQuestion);
exports.QuestionnaireQuestion = QuestionnaireQuestion;
//# sourceMappingURL=QuestionnaireQuestion.js.map