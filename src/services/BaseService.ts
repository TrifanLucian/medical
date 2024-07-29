import { Repository, EntityTarget, DeepPartial, SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { PaginatedResult, QueryFilter, paginate } from '../utils/pagination';
import { connection } from '../server/database';

export class BaseService<T extends ObjectLiteral> {
    protected repository: Repository<T>;
    private relations: string[];
    private queryRelations: { [key: string]: string[] };

    constructor(entity: EntityTarget<T>, relations: string[] = [], queryRelations: { [key: string]: string[] } = {}) {
        if (!connection) {
            throw new Error('Database connection not established');
        }
        this.repository = connection.getRepository(entity);
        this.relations = relations;
        this.queryRelations = queryRelations;
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async read(id: string, relationDepth: string = 'default'): Promise<T | undefined> {
        const relations = this.queryRelations[relationDepth] || this.relations;
        return this.repository.findOne(id, { relations });
    }

    async update(id: string, data: DeepPartial<T>): Promise<T | undefined> {
        await this.repository.update(id, data);
        return this.read(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }

    async list(page: number, limit: number, filters: QueryFilter[] = [], relationDepth: string = 'default'): Promise<PaginatedResult<T>> {
        const relations = this.queryRelations[relationDepth] || this.relations;

        let query = this.repository.createQueryBuilder('entity');
        query = this.applyFilters(query, filters);

        // Add left joins for relations
        relations.forEach(relation => {
            query = query.leftJoinAndSelect(`entity.${relation}`, relation);
        });

        const [result, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return paginate(result, page, limit, total);
    }

    protected applyFilters(query: SelectQueryBuilder<T>, filters: QueryFilter[]): SelectQueryBuilder<T> {
        filters.forEach((filter) => {
            query = query.andWhere(`entity.${filter.field} = :${filter.field}`, { [filter.field]: filter.value });
        });
        return query;
    }

    public getRelations(): string[] {
        return this.relations;
    }

    public getQueryRelations(): { [key: string]: string[] } {
        return this.queryRelations;
    }
}
