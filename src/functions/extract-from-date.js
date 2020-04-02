import { date } from 'quasar';

export function extractFromDate(dateString, mask = 'YYYY/MM/DD') {
  const extractedDate = date.extractDate(dateString, mask);

  return {
    day: extractedDate.getDate(),
    month: extractedDate.getMonth() + 1,
    year: extractedDate.getFullYear(),
  };
}
