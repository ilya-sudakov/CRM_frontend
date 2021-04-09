import { addSpaceDelimiter } from 'Utils/functions.jsx';
import Table from 'Components/Table/Table.jsx';

const TableView = ({ data, deleteItem, userHasAccess, link, isLoading }) => {
  const columns = [
    { text: 'Номер', value: 'number' },
    { text: 'Название', value: 'name' },
    {
      text: 'Кол-во',
      value: 'quantity',
      formatFn: ({ quantity }) => addSpaceDelimiter(quantity),
    },
    { text: 'Комментарий', value: 'comment' },
  ];
  const actions = ({ id }) => [
    {
      elementType: 'edit',
      title: 'Редактировать запись',
      link: `${link}/edit/${id}`,
    },
    {
      elementType: 'delete',
      title: 'Удаление записи',
      onClick: () => deleteItem(id),
      isRendered: userHasAccess(['ROLE_ADMIN']),
    },
  ];
  return (
    <Table
      data={data}
      columns={columns}
      actions={actions}
      loading={{ isLoading }}
    />
  );
};

export default TableView;
