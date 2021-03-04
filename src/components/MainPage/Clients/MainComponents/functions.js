import { exportClientsEmailsCSV } from 'Utils/xlsxFunctions.js';
import { getClients } from 'Utils/RequestsAPI/Clients.jsx';

export const sortClients = (clients, searchQuery, sortOrder) => {
  return clients.sort((a, b) => {
    if (searchQuery !== '') {
      const first =
          sortOrder.curSort === 'nextDateContact'
            ? new Date(a[sortOrder.curSort])
            : a[sortOrder.curSort],
        second =
          sortOrder.curSort === 'nextDateContact'
            ? new Date(b[sortOrder.curSort])
            : b[sortOrder.curSort];
      if (first < second) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1;
      }
      if (first > second) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1;
      }
      return 0;
    }
  });
};

export const getEmailsExcel = () => {
  let totalClients = 1;
  let clients = [];
  return getClients(1)
    .then((res) => res.json())
    .then((res) => {
      totalClients = res.totalElements;
      return getClients(totalClients);
    })
    .then((res) => res.json())
    .then((res) => {
      clients = res.content;
      console.log(clients);
      exportClientsEmailsCSV(clients);
    })
    .catch((error) => {
      console.log(error);
    });
};
