export function isNumeric(str: string | number | undefined): boolean {
  if (typeof str != 'string') return false;
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}
