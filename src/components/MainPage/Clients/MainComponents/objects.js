import { deleteClientLegalEntity } from 'API/Clients/LegalEntity.jsx';
import { deleteClientContact } from 'API/Clients/Contacts.jsx';
import {
  deleteClientWorkHistory,
  editClientWorkHistory,
  addClientWorkHistory,
} from 'API/Clients/WorkHistory.jsx';
import {
  deleteClient,
  getClientsByCategoryAndType,
  editNextContactDateClient,
  editClient,
} from 'API/Clients';
import { getSuppliersByCategoryAndType } from 'API/Clients/Suppliers';

export const clientTypes = {
  clients: {
    name: 'клиент',
    title: 'Клиенты',
    type: null,
    loadItemsByCategory: (category, curPage, itemsPerPage, sortOrder, signal) =>
      getClientsByCategoryAndType(
        category,
        curPage,
        itemsPerPage,
        sortOrder,
        signal,
      ),
    editItemFunction: (newClient, id) => editClient(newClient, id),
    deleteItemFunction: (id) => deleteClient(id),
    editWorkHistoryFunction: (newWorkHistory, id) =>
      editClientWorkHistory(newWorkHistory, id),
    editNextContactDateFunction: (date) => editNextContactDateClient(date),
    addWorkHistoryFunction: (newWorkHistory) =>
      addClientWorkHistory(newWorkHistory),
    deleteWorkHistoryFunction: (id) => deleteClientWorkHistory(id),
    deleteContactsFunction: (id) => deleteClientContact(id),
    deleteLegalEntityFunction: (id) => deleteClientLegalEntity(id),
  },
  suppliers: {
    name: 'поставщик',
    title: 'Поставщики',
    type: 'supplier',
    loadItemsByCategory: (category, curPage, itemsPerPage, sortOrder, signal) =>
      getSuppliersByCategoryAndType(
        category,
        curPage,
        itemsPerPage,
        sortOrder,
        signal,
      ),
    editItemFunction: (newClient, id) => editClient(newClient, id),
    deleteItemFunction: (id) => deleteClient(id),
    editWorkHistoryFunction: (newWorkHistory, id) =>
      editClientWorkHistory(newWorkHistory, id),
    editNextContactDateFunction: (date) => editNextContactDateClient(date),
    addWorkHistoryFunction: (newWorkHistory) =>
      addClientWorkHistory(newWorkHistory),
    deleteWorkHistoryFunction: (id) => deleteClientWorkHistory(id),
    deleteContactsFunction: (id) => deleteClientContact(id),
    deleteLegalEntityFunction: (id) => deleteClientLegalEntity(id),
  },
};
