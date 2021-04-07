import { format } from 'date-fns';
import Table from 'Components/Table/Table.jsx';

export default {
  title: 'Table/Table',
  component: Table,
};

const Template = (args) => <Table {...args} />;

const columns = [
  {
    text: 'Дата постановки',
    value: 'dateCreated',
    width: '12%',
    maxWidth: '100px',
    formatFn: ({ dateCreated }) => format(new Date(dateCreated), 'dd.MM.yyyy'),
  },
  {
    text: 'Описание',
    value: 'description',
    width: '30%',
  },
  {
    text: 'Ответственный',
    value: 'responsible',
    width: '15%',
  },
  {
    text: 'Дата контроля',
    value: 'dateControl',
    width: '12%',
    maxWidth: '120px',
    formatFn: ({ dateControl }) => format(new Date(dateControl), 'dd.MM.yyyy'),
    badge: {
      type: 'error',
      isVisibleFn: (date) => new Date(date) < new Date(),
    },
  },
  {
    text: 'Состояние',
    value: 'status',
    width: '20%',
  },
  {
    text: 'Статус',
    value: 'condition',
    width: '15%',
    maxWidth: '120px',
    status: {
      options: [
        { text: 'Материалы', type: 'materials' },
        { text: 'Выполнено', type: 'completed' },
        { text: 'В процессе', type: 'in-process' },
        { text: 'Отложено', type: 'delayed' },
        { text: 'Проблема', type: 'problem' },
      ],
    },
  },
];

const data = [
  {
    id: 79,
    dateCreated: '2021-03-01T05:33:03.788Z',
    description: 'Штамп Cedral original',
    responsible: 'ЦехЛЭМЗ',
    dateControl: '2021-03-08T05:33:03.788Z',
    status: 'Неспешное строительство',
    condition: 'В процессе',
  },
  {
    id: 81,
    dateCreated: '2021-03-10T13:42:42.736Z',
    description:
      'Приклеить (и прикрутить через монтажную ленту?) резиновые коврики на ступеньки лестницы',
    responsible: 'Инженер2',
    dateControl: '2021-03-17T13:42:42.736Z',
    status: '',
    condition: 'В процессе',
  },
  {
    id: 83,
    dateCreated: '2021-03-15T07:17:06.473Z',
    description: 'Переделка штампа "Бугель"',
    responsible: 'ЦехЛЭМЗ',
    dateControl: '2021-03-22T07:17:06.473Z',
    status: '',
    condition: 'В процессе',
  },
];

const actions = (item) => [
  {
    elementType: 'edit',
    title: 'Редактирование задачи',
    link: `/dispatcher/general-tasks/edit/${item.id}`,
    isRendered: true,
  },
  {
    elementType: 'delete',
    title: 'Удаление задачи',
    onClick: () => {},
    isRendered: true,
  },
];

export const Default = Template.bind({});
Default.args = {
  columns: columns,
  data: data,
};

export const Loading = Template.bind({});
Loading.args = {
  columns: columns,
  loading: { isLoading: true },
};

export const WithActions = Template.bind({});
WithActions.args = {
  columns: columns,
  data: data,
  actions,
};

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  columns: columns,
  data: [],
  actions,
};

export const NestedTable = Template.bind({});
NestedTable.args = {
  columns: columns,
  data: data,
  actions,
  nestedTable: {
    fieldName: 'nestedItems',
    columns: columns,
    actions,
  },
};
