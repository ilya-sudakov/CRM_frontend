export const getDateFromWeekdayIndex = (dayIndex, weekOffset) => {
  return new Date(
    new Date().setDate(
      new Date().getDate() +
        -7 * weekOffset -
        new Date(
          new Date().setDate(new Date().getDate() + -7 * weekOffset),
        ).getDay() +
        dayIndex,
    ),
  );
};

export const getWeekdaysListWithOffset = (offset = 0) => {
  const curDay = new Date(
    new Date().setDate(new Date().getDate() + -7 * offset),
  );
  let week = [];
  for (
    let i = 1;
    i <=
    (offset === 0 ? (new Date().getDay() === 0 ? 7 : new Date().getDay()) : 7);
    i++
  ) {
    let first = curDay.getDate() - curDay.getDay() + i;
    let day = new Date(curDay.setDate(first));
    week.push(day);
  }
  return week;
};
