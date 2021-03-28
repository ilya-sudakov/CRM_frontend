import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../../App.js';
import {
  deletePriceList,
  getPriceLists,
} from 'Utils/RequestsAPI/Clients/price_list.js';
import styled from 'styled-components';
import DeleteItemAction from 'Utils/TableView/TableActions/Actions/DeleteItemAction.jsx';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';

const PricesListPage = ({ onSelect }) => {
  const [ltdData, setLtdData] = useState([]);
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const loadLTDList = () => {
    getPriceLists()
      .then(({ data }) => {
        setLtdData([...data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    loadLTDList();
  }, []);

  const deleteItem = (id) => {
    deletePriceList(id).then(() => loadLTDList());
  };

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  const Text = styled.div`
    margin-bottom: 5px;
    font-size: 1rem;
    color: #777;
  `;

  return (
    <Wrapper>
      <Text>Вы можете выбрать загруженные прайсы</Text>
      <TableView
        data={ltdData}
        deleteItem={deleteItem}
        userHasAccess={userContext.userHasAccess}
        isLoading={isLoading}
        onSelect={onSelect}
      />
    </Wrapper>
  );
};

export default PricesListPage;

const TableView = ({
  data,
  deleteItem,
  // userHasAccess,
  isLoading,
  setShowWindow,
  selectedItem,
  onSelect,
}) => {
  useEffect(() => {
    if (!setShowWindow) return;
    setShowWindow(false);
  }, [selectedItem]);

  const List = styled.div`
    display: flex;
    margin-bottom: 20px;
    width: 100%;
  `;

  const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    transition: 100ms ease-in-out;

    &:hover {
      background-color: #eee;
    }
  `;

  const ItemBar = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 20px;
    padding-right: 3px;
    font-size: 0.9rem;
    color: #777;
  `;

  const FilenameColumn = styled.span`
    margin-right: 50px;
  `;

  const StyledDeleteItemAction = styled(DeleteItemAction)`
    margin-left: 10px;
  `;

  return (
    <List className="prices__tableview">
      {isLoading ? (
        <PlaceholderLoading
          itemClassName="prices__item"
          minHeight="30px"
          items={3}
        />
      ) : (
        data.map((item) => (
          <ListItem
            onClick={onSelect ? () => onSelect(item) : null}
            key={item.id}
          >
            <ItemBar title={`Выбрать ${item.uri.split('downloadFile/')[1]}`}>
              <FilenameColumn>
                {item.uri.split('downloadFile/')[1]}
              </FilenameColumn>
              <StyledDeleteItemAction
                title="Удаление прайса"
                onClick={() => deleteItem(item.id)}
              />
            </ItemBar>
          </ListItem>
        ))
      )}
    </List>
  );
};
