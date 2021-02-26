export const filterEmployeesBySearchQuery = (data, searchQuery) => {
  const query = searchQuery.toLowerCase();
  return data.filter((item) => {
    if (item.name === null) return false;
    const isFound =
      item.lastName.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.middleName.toLowerCase().includes(query) ||
      item.id.toString().includes(query) ||
      (item.yearOfBirth && item.yearOfBirth.toString().includes(query)) ||
      (item.dateOfBirth && item.dateOfBirth.toString().includes(query)) ||
      item.citizenship.toLowerCase().includes(query) ||
      item.workshop.toLowerCase().includes(query) ||
      item.position.toLowerCase().includes(query) ||
      item.comment.toLowerCase().includes(query) ||
      item.relevance.toLowerCase().includes(query);
    return isFound;
  });
};
