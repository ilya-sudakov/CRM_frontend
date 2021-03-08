export const getWeekDays = (date) => {
  let week = [];
  let curDate = new Date(date);

  for (let i = 1; i <= 7; i++) {
    const first = curDate.getDate() - curDate.getDay() + i;
    const day = new Date(curDate.setDate(first));
    week.push(day);
  }

  // console.log(curDate, week)
  const startDate = week[0];
  const endDate = week[6];
  return { week, startDate, endDate };
};
