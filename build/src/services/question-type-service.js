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
exports.QuestionTypeService = void 0;
const typedi_1 = require("typedi");
const BaseService_1 = require("./BaseService");
const ServiceFactory_1 = require("./ServiceFactory");
const QuestionType_1 = require("../models/QuestionType");
let QuestionTypeService = class QuestionTypeService extends BaseService_1.BaseService {
    constructor(factory) {
        super(QuestionType_1.QuestionType, factory.createService(QuestionType_1.QuestionType).getRelations(), factory.createService(QuestionType_1.QuestionType).getQueryRelations());
        factory.setRelations(QuestionType_1.QuestionType, []);
        factory.setRelations(QuestionType_1.QuestionType, [], 'deep');
    }
};
QuestionTypeService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [ServiceFactory_1.ServiceFactory])
], QuestionTypeService);
exports.QuestionTypeService = QuestionTypeService;
//# sourceMappingURL=question-type-service.js.map