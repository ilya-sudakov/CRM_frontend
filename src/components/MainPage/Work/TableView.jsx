import { useState, useEffect, useContext } from 'react';
import 'Components/MainWindow/MainWindow.scss';
import { sortByField } from 'Utils/sorting/sorting';
import Table from 'Components/Table/Table.jsx';
import UserContext from 'Components/../App';

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(UserContext);

  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.work.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    );
  };

  const sortWorkItems = (data) => {
    return searchQuery(
      sortByField(data, { fieldName: 'work', direction: 'asc' }),
    );
  };

  useEffect(() => {
    props.data.length > 0 && setIsLoading(false);
  }, [props.data]);

  const columns = [
    { text: 'Название', value: 'work' },
    { text: 'Тип', value: 'typeOfWork' },
  ];
  const actions = (item) => [
    {
      elementType: 'edit',
      title: 'Редактировать работу',
      link: `/work-list/edit/${item.id}`,
    },
    {
      elementType: 'delete',
      title: 'Удаление работы',
      onClick: () => props.deleteItem(item.id),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];

  return (
    <Table
      columns={columns}
      data={sortWorkItems(props.data)}
      loading={{ isLoading }}
      actions={props.selectWork ? undefined : actions}
      onClick={
        props.selectWork
          ? ({ work, id, typeOfWork }) => props.selectWork(work, id, typeOfWork)
          : undefined
      }
      options={props.selectWork ? { fullSize: true } : undefined}
    />
  );
};

export default TableView;
