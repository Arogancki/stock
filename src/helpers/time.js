exports.isLastFridayOfNovember = (date) => {
  const year = date.getFullYear();
  if (date.getMonth() !== 10) return false;

  const lastFriday = new Date(year, 11, 0);
  lastFriday.setDate(lastFriday.getDate() - ((lastFriday.getDay() + 2) % 7));

  return date.toDateString() === lastFriday.toDateString();
};
