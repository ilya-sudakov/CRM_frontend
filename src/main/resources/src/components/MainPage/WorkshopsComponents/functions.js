export const getPageByRequest = (item) => {
  if (item.status === "Завершено") {
    return "completed";
  }
  if (item.status === "Отгружено" || item.status === "Частично отгружено") {
    return "shipped";
  }
  if (
    item.status !== "Завершено" &&
    item.status !== "Отгружено" &&
    item.status !== "Частично отгружено"
  ) {
    return "open";
  }
  return "open";
};
