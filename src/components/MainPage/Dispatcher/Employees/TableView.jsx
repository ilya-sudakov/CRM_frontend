import { useContext, useMemo } from 'react';
import { useTable } from 'Utils/hooks';
import { sortByField } from 'Utils/sorting/sorting';
import UserContext from '../../../../App';
import {
  filterEmployeesBySearchQuery,
  getEmployeesByWorkshopListPdfText,
} from './functions';
import { formatDateString } from 'Utils/functions.jsx';

const workshops = [
  { name: 'ЦехЛЭМЗ' },
  { name: 'ЦехЛепсари' },
  { name: 'ЦехЛиговский' },
  { name: 'Офис' },
  { name: 'Уволенные' },
];
const filterEmployees = (data, workshopItem) => {
  return data.filter(
    (employee) =>
      (workshopItem === employee.workshop && employee.relevance !== 'Уволен') ||
      (workshopItem === 'Уволенные' && employee.relevance === 'Уволен'),
  );
};
const sortEmployees = (data, searchQuery) => {
  return sortByField(filterEmployeesBySearchQuery(data, searchQuery), {
    fieldName: 'lastName',
    direction: 'asc',
  });
};

const TableView = ({
  isLoading,
  searchQuery,
  employees,
  deleteItem,
  onSelect,
}) => {
  const userContext = useContext(UserContext);
  const columns = [
    {
      text: 'Подразделение',
      value: 'name',
      itemsCount: (item) =>
        item.name !== 'Уволенные'
          ? filterEmployees(employees, item.name).length
          : null,
    },
  ];
  const nestedColumns = [
    {
      text: 'ФИО',
      value: 'lastName',
      formatFn: (item) => `${item.lastName} ${item.name} ${item.middleName}`,
    },
    {
      text: 'Дата рождения',
      value: 'dateOfBirth',
      formatFn: ({ dateOfBirth }) => formatDateString(dateOfBirth),
    },
    { text: 'Гражданство', value: '' },
    { text: 'Должность', value: 'position' },
  ];
  const actions = (item) => [
    {
      onClick: () =>
        getEmployeesByWorkshopListPdfText(item.employees, item.name),
      icon: 'print',
      text: 'Печать',
      isOutside: true,
    },
  ];
  const actionsNested = (item) => [
    {
      elementType: 'edit',
      title: 'Редактирование сотрудника',
      link: `/dispatcher/employees/edit/${item.id}`,
      isRendered: userContext.userHasAccess([
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_WORKSHOP',
      ]),
    },
    {
      elementType: 'delete',
      title: 'Удаление сотрудника',
      onClick: () => deleteItem(item.id),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];
  const data = onSelect
    ? useMemo(() => sortEmployees(employees, searchQuery), [
        employees,
        isLoading,
        searchQuery,
      ])
    : useMemo(
        () =>
          workshops.map((workshop) => ({
            ...workshop,
            employees: sortEmployees(
              filterEmployees(employees, workshop.name),
              searchQuery,
            ),
          })),
        [employees, isLoading, searchQuery],
      );

  const [table] = useTable({
    data,
    isLoading,
    onClick: onSelect ? (item) => onSelect(item) : undefined,
    columns: onSelect ? nestedColumns : columns,
    actions: onSelect ? undefined : actions,
    nestedTable: onSelect
      ? undefined
      : {
          isLoading,
          columns: nestedColumns,
          actions: actionsNested,
          fieldName: 'employees',
        },
    options: onSelect ? { fullSize: true } : undefined,
  });

  return table;
};

export default TableView;
