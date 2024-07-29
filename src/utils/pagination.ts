export interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  totalPages: number;
  count: number;
}

export interface QueryFilter {
    field: string;
    value: any;
}
export const paginate = <T>(
  data: T[],
  page: number,
  limit: number,
  count: number,
): PaginatedResult<T> => ({
    data,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
    count,
  });
