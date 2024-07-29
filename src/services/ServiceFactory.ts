import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { EntityTarget, ObjectLiteral } from 'typeorm';

type RelationsConfig = {
    [entity: string]: {
        default: string[];
        [key: string]: string[];
    };
};

@Service()
export class ServiceFactory {
    private relationsConfig: RelationsConfig;

    constructor() {
        this.relationsConfig = {};
    }

    setRelations<T>(entity: EntityTarget<T>, relations: string[], depth: string = 'default'): void {
        const entityName = (entity as any).name;
        if (!this.relationsConfig[entityName]) {
            this.relationsConfig[entityName] = { default: [] };
        }
        this.relationsConfig[entityName][depth] = relations;
    }

    createService<T extends ObjectLiteral>(entity: EntityTarget<T>): BaseService<T> {
        const entityName = (entity as any).name;
        const relationsConfig = this.relationsConfig[entityName] || { default: [] };
        const defaultRelations = relationsConfig.default;
        const queryRelations = { ...relationsConfig };

        return new BaseService(entity, defaultRelations, queryRelations);
    }
}