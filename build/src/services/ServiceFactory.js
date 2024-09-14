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
exports.ServiceFactory = void 0;
const typedi_1 = require("typedi");
const BaseService_1 = require("./BaseService");
let ServiceFactory = class ServiceFactory {
    constructor() {
        this.relationsConfig = {};
    }
    setRelations(entity, relations, depth = 'default') {
        const entityName = entity.name;
        if (!this.relationsConfig[entityName]) {
            this.relationsConfig[entityName] = { default: [] };
        }
        this.relationsConfig[entityName][depth] = relations;
    }
    createService(entity) {
        const entityName = entity.name;
        const relationsConfig = this.relationsConfig[entityName] || { default: [] };
        const defaultRelations = relationsConfig.default;
        const queryRelations = { ...relationsConfig };
        return new BaseService_1.BaseService(entity, defaultRelations, queryRelations);
    }
};
ServiceFactory = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], ServiceFactory);
exports.ServiceFactory = ServiceFactory;
//# sourceMappingURL=ServiceFactory.js.map