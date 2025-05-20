export const formatNumber = (value: number | null | undefined): string => {
  if (value == null) return 'N/A';
  return new Intl.NumberFormat('en-US').format(value);
};
