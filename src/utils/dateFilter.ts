export function DateFilter(days: number) {
  const response = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  return response;
}
