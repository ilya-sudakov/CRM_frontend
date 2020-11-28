export const sortClients = (clients, searchQuery, sortOrder) => {
  return clients.sort((a, b) => {
    if (searchQuery !== '') {
      if (sortOrder.curSort === 'nextDateContact') {
        if (new Date(a[sortOrder.curSort]) < new Date(b[sortOrder.curSort])) {
          return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
        }
        if (new Date(a[sortOrder.curSort]) > new Date(b[sortOrder.curSort])) {
          return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
        }
        return 0
      } else {
        if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
          return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
        }
        if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
          return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
        }
        return 0
      }
    }
  })
}
