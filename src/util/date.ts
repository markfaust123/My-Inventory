export const getFormattedDate = (date: Date | string) => {
  if (typeof date == "string") {
    return date;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
};

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1 - days
  );
};
