// format 2024-03-05T19:22:32.000Z to dd/mm/yyyy complete day and month with zero
export function formatDate(date: string) {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}