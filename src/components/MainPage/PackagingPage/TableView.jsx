import Table from 'Components/Table/Table.jsx';
import { useContext } from 'react';
import UserContext from 'Components/../App';

const TableView = ({ data, isLoading, deleteItem, onSelect, searchQuery }) => {
  const userContext = useContext(UserContext);
  const columns = [
    { text: 'Название', value: 'name' },
    { text: 'Кол-во', value: 'quantity' },
    { text: 'Размер', value: 'size' },
    { text: 'Комментарий', value: 'comment' },
  ];
  const actions = (item) => [
    {
      elementType: 'edit',
      title: 'Редактировать запись',
      link: `/packaging/edit/${item.id}`,
    },
    {
      elementType: 'delete',
      title: 'Удаление записи',
      onClick: () => deleteItem(item.id),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];
  const filterData = (data) => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.quantity
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.comment.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };
  return (
    <Table
      data={filterData(data)}
      columns={columns}
      actions={onSelect ? undefined : actions}
      loading={{ isLoading }}
      onClick={onSelect ? (item) => onSelect(item) : undefined}
      options={onSelect ? { fullSize: true } : undefined}
    />
  );
};

export default TableView;
