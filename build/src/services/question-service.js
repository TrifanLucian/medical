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
exports.QuestionService = void 0;
const typedi_1 = require("typedi");
const BaseService_1 = require("./BaseService");
const ServiceFactory_1 = require("./ServiceFactory");
const Question_1 = require("../models/Question");
let QuestionService = class QuestionService extends BaseService_1.BaseService {
    constructor(factory) {
        // Set relations first
        factory.setRelations(Question_1.Question, ['question_type', 'created_by']);
        factory.setRelations(Question_1.Question, ['question_type', 'created_by', 'created_by.role'], 'deep');
        // Now create the service with the updated relations
        const service = factory.createService(Question_1.Question);
        super(Question_1.Question, service.getRelations(), service.getQueryRelations());
    }
};
QuestionService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [ServiceFactory_1.ServiceFactory])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question-service.js.map