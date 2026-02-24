// Simple pagination utility: returns skip and take only
export function getPagination(page: number = 1, limit: number = 10) {
  const take = limit > 0 ? limit : 10;
  const skip = page > 1 ? (page - 1) * take : 0;
  return { skip, take };
}
