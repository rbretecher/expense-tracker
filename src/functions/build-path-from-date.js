import { extractFromDate } from 'src/functions/extract-from-date';

export function buildPathFromDate(dateString, mask = 'YYYY/MM/DD') {
  const { year, month } = extractFromDate(dateString, mask);

  return `${year}.${month}`;
}
