export const workshops = {
  requests: {
    name: "Заявки",
    title: "",
    redirectURL: "/requests",
    type: "requests",
    fullName: "Заявки",
  },
  lemz: {
    name: "ЛЭМЗ",
    title: "ЛЭМЗ",
    redirectURL: "/lemz/workshop-lemz",
    ordersRedirectURL: "/lemz/workshop-orders",
    type: "lemz",
    fullName: "ЦехЛЭМЗ",
  },
  lepsari: {
    name: "Лепсари",
    title: "Лепсари",
    redirectURL: "/lepsari/workshop-lepsari",
    ordersRedirectURL: "/lepsari/workshop-orders",
    type: "lepsari",
    fullName: "ЦехЛепсари",
  },
  ligovskiy: {
    name: "Лиговский",
    title: "Лиговский",
    redirectURL: "/ligovskiy/workshop",
    ordersRedirectURL: "/ligovskiy/workshop-orders",
    type: "ligovskiy",
    fullName: "ЦехЛиговский",
  },
  null: {
    name: "Заявки",
    title: "",
    redirectURL: "/requests",
    type: "requests",
    fullName: "Заявки",
  },
};

export const requestStatuses = [
  {
    name: "Проблема/Материалы",
    oldName: "Проблема-материалы",
    className: "materials",
    access: ["ROLE_ADMIN", "ROLE_WORKSHOP"],
  },
  {
    name: "Завершено",
    className: "completed",
    access: ["ROLE_ADMIN"],
  },
  {
    name: "Отгружено",
    className: "shipped",
    access: ["ROLE_ADMIN", "ROLE_WORKSHOP", "ROLE_MANAGER"],
  },
  {
    name: "Частично отгружено",
    className: "shipped-in-parts",
    access: [],
  },
  {
    name: "Готово к отгрузке",
    oldName: "Готово",
    className: "ready",
    access: ["ROLE_ADMIN", "ROLE_WORKSHOP"],
  },
  {
    name: "В производстве",
    className: "in-production",
    access: [],
  },
  {
    name: "Ожидание",
    className: "waiting",
    access: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_WORKSHOP"],
  },
  {
    name: "Приоритет",
    className: "priority",
    access: ["ROLE_ADMIN"],
  },
];

export const productsStatuses = [
  {
    name: "В работе",
    oldName: null,
    className: "production",
    access: ["ROLE_ADMIN", "ROLE_WORKSHOP", "ROLE_MANAGER"],
  },
  {
    name: "Завершено",
    className: "completed",
    access: ["ROLE_ADMIN"],
  },
  {
    name: "Приоритет",
    className: "defect",
    access: ["ROLE_ADMIN"],
  },
];
