export const filterRigItems = (data = [], curPage) => {
  return data.filter((item) => {
    if (item.color === 'completed' && curPage === 'Завершено') {
      return true;
    }
    if (curPage === 'Активные' && item.color !== 'completed') {
      return true;
    }
  });
};
