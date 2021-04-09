import UserContext from 'Components/../App';
import Table from 'Components/Table/Table.jsx';
import { useContext } from 'react';

const TableView = ({ data, onEdit, deleteItem, isLoading, onSelect }) => {
  const userContext = useContext(UserContext);
  const columns = [{ text: 'Название', value: 'name' }];
  const actions = (item) => [
    {
      elementType: 'edit',
      title: 'Редактировать запись',
      onClick: () => onEdit(item),
    },
    {
      elementType: 'delete',
      title: 'Удаление категории',
      onClick: () => deleteItem(item.id),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      loading={{ isLoading }}
      actions={onSelect ? undefined : actions}
      onClick={onSelect ? onSelect : undefined}
      options={onSelect ? { fullSize: true } : undefined}
    />
  );
};

export default TableView;
