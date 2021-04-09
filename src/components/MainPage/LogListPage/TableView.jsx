import {
  formatDateStringNoYear,
  formatDateStringToTime,
} from 'Utils/functions.jsx';
import { logItemsRedirectLinks } from './objects.js';
import Table from 'Components/Table/Table.jsx';

const TableView = ({ data = [], isLoading = false }) => {
  const columns = [
    {
      text: 'Время',
      value: 'date',
      formatFn: ({ date }) =>
        `${formatDateStringNoYear(date)} ${formatDateStringToTime(date)} `,
    },
    {
      text: 'Пользователь',
      value: 'author',
    },
    {
      text: 'Действие',
      value: 'action',
    },
    {
      text: 'Описание',
      value: 'description',
      link: {
        getURL: (item) => {
          const itemId = item.description.split('№')[1];
          return `${logItemsRedirectLinks[item.type]}/${
            item.elementId ?? itemId
          }`;
        },
        newTab: true,
      },
    },
  ];
  return <Table columns={columns} data={data} loading={{ isLoading }} />;
};

export default TableView;
