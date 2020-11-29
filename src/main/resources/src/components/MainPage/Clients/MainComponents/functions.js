import { exportClientsEmailsCSV } from '../../../../utils/xlsxFunctions.jsx'
import { getClients } from '../../../../utils/RequestsAPI/Clients.jsx'

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

export const getEmailsExcel = () => {
  let totalClients = 1
  let clients = []
  return getClients(1)
    .then((res) => res.json())
    .then((res) => {
      totalClients = res.totalElements
      return getClients(totalClients)
    })
    .then((res) => res.json())
    .then((res) => {
      clients = res.content
      console.log(clients)
      exportClientsEmailsCSV(clients)
    })
    .catch((error) => {
      console.log(error)
    })
}
