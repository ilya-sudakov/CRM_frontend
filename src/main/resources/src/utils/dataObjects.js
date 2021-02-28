export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const customSelectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: "100%",
    borderColor: "1px solid #00a3a2",
  }),
  option: (provided, state) => ({
    ...provided,
    borderColor: "1px solid #00a3a2",
  }),
};
