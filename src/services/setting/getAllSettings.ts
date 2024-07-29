import { getRepository } from 'typeorm';
import { Setting } from '../../models/Setting'; // Adjust the path as necessary
import { paginate, PaginatedResult } from '../../utils/pagination';

export const getAllSettings = async (
    page = 1,
    limit = 10,
    scope?: 'public' | 'secret' | 'dev'
): Promise<PaginatedResult<Setting>> => {
  const zoneRepository = getRepository(Setting);

  const queryBuilder = zoneRepository.createQueryBuilder('setting');

  if (scope) {
    queryBuilder.where('setting.scope = :scope', { scope });
  }

  const [data, totalRecords] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

  return paginate<Setting>(data, page, limit, totalRecords);
};
