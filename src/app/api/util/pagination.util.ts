// Pagination utility for TypeORM queries
export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export async function paginateQuery<T>(
  query: any, // TypeORM SelectQueryBuilder<T>
  page: number = 1,
  limit: number = 10
): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;
  const [data, total] = await query.skip(skip).take(limit).getManyAndCount();
  return { data, total, page, limit };
}
