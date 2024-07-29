import { Repository, EntityTarget, DeepPartial, ObjectLiteral, FindManyOptions, FindOneOptions } from 'typeorm';
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
        const options: FindOneOptions<T> = { relations };
        return this.repository.findOne(id, options);
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
        const options: FindManyOptions<T> = {
            relations,
            skip: (page - 1) * limit,
            take: limit,
            where: this.buildWhereClause(filters),
        };

        const [result, total] = await this.repository.findAndCount(options);

        return paginate(result, page, limit, total);
    }

    protected buildWhereClause(filters: QueryFilter[]): ObjectLiteral {
        const where: ObjectLiteral = {};
        filters.forEach(filter => {
            where[filter.field] = filter.value;
        });
        return where;
    }

    public getRelations(): string[] {
        return this.relations;
    }

    public getQueryRelations(): { [key: string]: string[] } {
        return this.queryRelations;
    }
}
