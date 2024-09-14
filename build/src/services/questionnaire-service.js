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
exports.QuestionnaireService = void 0;
const typedi_1 = require("typedi");
const BaseService_1 = require("./BaseService");
const ServiceFactory_1 = require("./ServiceFactory");
const Questionnaire_1 = require("../models/Questionnaire");
let QuestionnaireService = class QuestionnaireService extends BaseService_1.BaseService {
    constructor(factory) {
        super(Questionnaire_1.Questionnaire, factory.createService(Questionnaire_1.Questionnaire).getRelations(), factory.createService(Questionnaire_1.Questionnaire).getQueryRelations());
        factory.setRelations(Questionnaire_1.Questionnaire, ['type', 'created_by']);
        factory.setRelations(Questionnaire_1.Questionnaire, ['type', 'created_by', 'created_by.role'], 'deep');
    }
};
QuestionnaireService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [ServiceFactory_1.ServiceFactory])
], QuestionnaireService);
exports.QuestionnaireService = QuestionnaireService;
//# sourceMappingURL=questionnaire-service.js.map