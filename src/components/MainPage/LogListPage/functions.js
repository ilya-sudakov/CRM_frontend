import { formatDateStringWithTime } from 'Utils/functions.jsx';

export const filterSearchQuery = (data, searchQuery) => {
  const query = searchQuery.toLowerCase();
  return data.filter(
    (item) =>
      item.author.toLowerCase().includes(query) ||
      formatDateStringWithTime(item.date).toLowerCase().includes(query) ||
      item.id.toString().includes(query),
  );
};

export const filterLogListItems = (logs, page) => {
  return logs.filter((log) => log.type === page);
};

export const sortHistory = (data, sortOrder) => {
  return data.sort((a, b) => {
    if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
      return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1;
    }
    if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
      return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1;
    }
    return 0;
  });
};
