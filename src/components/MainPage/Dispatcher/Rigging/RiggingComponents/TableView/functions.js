export const isPartHidden = (list, index) => {
  index = Number.parseInt(index);
  let check = true;
  list.map((element) => {
    if (element.id === index) {
      check = element.hidden;
    }
  });
  return check;
};

export const searchQuery = (data, query) => {
  let re = /[.,\_-\s]/gi;
  const newQuery = query.toLowerCase();
  return data.filter(
    (item) =>
      item.id.toString().includes(newQuery) ||
      item.comment.toLowerCase().includes(newQuery) ||
      item.name.toLowerCase().includes(newQuery) ||
      item.number
        .toLowerCase()
        .replace(re, "")
        .includes(newQuery.replace(re, ""))
  );
};

export const sortStampParts = (data) => {
  return data.sort((a, b) => {
    if (a.number < b.number) {
      return -1;
    }
    if (a.number > b.number) {
      return 1;
    }
    if (a.number === b.number && a.id < b.id) {
      return -1;
    }
    if (a.number === b.number && a.id > b.id) {
      return 1;
    }
    return 0;
  });
};
