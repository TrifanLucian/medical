import { Repository, EntityTarget, getRepository, DeepPartial, SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { PaginatedResult, QueryFilter, paginate } from '../utils/pagination';

export class BaseService<T extends ObjectLiteral> {
    protected repository: Repository<T>;
    private relations: string[];

    constructor(entity: EntityTarget<T>, relations: string[] = []) {
        this.repository = getRepository(entity);
        this.relations = relations;
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async read(id: string): Promise<T | undefined> {
        return this.repository.findOne(id, { relations: this.relations });
    }

    async update(id: string, data: DeepPartial<T>): Promise<T | undefined> {
        await this.repository.update(id, data);
        return this.read(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }

    async list(page: number, limit: number, filters: QueryFilter[] = []): Promise<PaginatedResult<T>> {
        const [result, total] = await this.applyFilters(this.repository.createQueryBuilder('entity'), filters)
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return paginate(result, page, limit, total);
    }

    protected applyFilters(query: SelectQueryBuilder<T>, filters: QueryFilter[]): SelectQueryBuilder<T> {
        filters.forEach((filter) => {
            query = query.andWhere(`entity.${filter.field} = :value`, { value: filter.value });
        });
        return query;
    }

    public getRelations(): string[] {
        return this.relations;
    }
}
