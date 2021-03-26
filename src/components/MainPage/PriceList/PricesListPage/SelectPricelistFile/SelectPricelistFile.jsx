import { useContext, useEffect, useState } from 'react';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';
import SelectFromButton from 'Utils/Form/SelectFromButton/SelectFromButton.jsx';
import TableView from '../TableView/TableView.jsx';
import UserContext from '../../../../../App.js';
import './SelectPricelistFile.scss';
import { getPriceLists } from 'Utils/RequestsAPI/Clients/price_list.js';

const SelectPricelistFile = ({ data, onChange, defaultValue }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [ltdData, setLtdData] = useState([]);
  const [showWindow, setShowWindow] = useState(false);
  const userContext = useContext(UserContext);

  const loadLtd = () => {
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
    if (defaultValue) setSelectedItem(defaultValue);
    if (data) return setLtdData(data);
    loadLtd();
  }, []);

  return (
    <div className="select-pricefile">
      <div className="main-form__item">
        <div className="main-form__input_name main-form__input_name--header">
          Прайс-лист
          <SelectFromButton
            text="Выберите файл"
            onClick={() => setShowWindow(!showWindow)}
          />
        </div>
        <div className="main-form__input_field">
          <FormWindow
            title="Выбор файла прайс-листа"
            content={
              <TableView
                data={ltdData}
                userHasAccess={userContext.userHasAccess}
                onSelect={(item) => {
                  setSelectedItem(item);
                  onChange(item);
                  setShowWindow(false);
                }}
                selectedItem={selectedItem}
                isLoading={isLoading}
                showWindow={showWindow}
                setShowWindow={setShowWindow}
              />
            }
            showWindow={showWindow}
            setShowWindow={setShowWindow}
          />
          {selectedItem ? (
            <p>{`ID #${selectedItem.id} | ${
              selectedItem.uri.split('downloadFile/')[1]
            }`}</p>
          ) : (
            <span>Вы можете закрепить .xlsx прайс-лист к данному клиенту</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectPricelistFile;
