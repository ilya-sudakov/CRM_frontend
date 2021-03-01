export const defaultPrintObject = {
  ["id"]: {
    visible: true,
  },
  ["date"]: {
    visible: false,
  },
  ["products"]: {
    visible: true,
  },
  ["client"]: {
    visible: true,
  },
  ["responsible"]: {
    visible: true,
  },
  ["status"]: {
    visible: true,
  },
  ["date-shipping"]: {
    visible: true,
  },
  ["comment"]: {
    visible: true,
  },
  ["price"]: {
    visible: true,
  },
};

export const pages = {
  open: {
    name: "Открытые",
  },
  shipped: {
    name: "Отгружено",
  },
  completed: {
    name: "Завершено",
  },
};

export const requstsSortOptions = [
  { value: "date desc", text: "По дате (убыв.)" },
  { value: "date asc", text: "По дате (возр.)" },
  { value: "sum desc", text: "По сумме (убыв.)" },
  { value: "sum asc", text: "По сумме (возр.)" },
  { value: "shippingDate desc", text: "По даты отгрузки (убыв.)" },
  { value: "shippingDate asc", text: "По даты отгрузки (возр.)" },
];
