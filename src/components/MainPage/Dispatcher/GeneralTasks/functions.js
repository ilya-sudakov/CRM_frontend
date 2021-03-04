import { formatDateString } from 'Utils/functions.jsx';

export const filterCompletedTasks = (tasks, curPage) => {
  return tasks.filter(
    (task) =>
      (curPage === 'В процессе' && task.condition !== 'Выполнено') ||
      (curPage === 'Завершено' && task.condition === 'Выполнено'),
  );
};

export const filterTasksUsers = (tasks, taskUsers) => {
  return tasks.filter((item) => {
    let check = false;
    let noActiveStatuses = true;
    Object.entries(taskUsers).map((user) => {
      Object.entries(taskUsers).map((user) => {
        if (user[1]) {
          noActiveStatuses = false;
        }
      });
      if (
        noActiveStatuses === true ||
        (user[1] && user[0] === item.responsible)
      ) {
        check = true;
        return;
      }
    });
    return check;
  });
};

export const filterSearchQuery = (data, searchQuery) => {
  const query = searchQuery.toLowerCase();
  return data.filter(
    (item) =>
      item.id.toString().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.responsible.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      formatDateString(item.dateCreated).includes(query) ||
      formatDateString(item.dateControl).includes(query),
  );
};

export const getTasksDefaultInputs = (username = '') => {
  return [
    {
      name: 'dateCreated',
      defaultValue: new Date(),
      isRequired: true,
      isValid: true,
    },
    {
      name: 'dateControl',
      defaultValue: new Date(new Date().setDate(new Date().getDate() + 7)),
      isRequired: true,
      isValid: true,
    },
    {
      name: 'description',
      defaultValue: '',
      isRequired: true,
    },
    {
      name: 'responsible',
      defaultValue: username,
      isRequired: true,
      isValid: true,
    },
    {
      name: 'status',
      defaultValue: '',
    },
    {
      name: 'condition',
      defaultValue: 'В процессе',
    },
  ];
};
