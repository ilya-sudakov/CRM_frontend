import { useContext, useEffect, useState } from 'react';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';
import SelectFromButton from 'Utils/Form/SelectFromButton/SelectFromButton.jsx';
import TableView from '../TableView/TableView.jsx';
import UserContext from '../../../../../App.js';
import './SelectLtd.scss';
import { getLTDList } from 'Utils/RequestsAPI/PriceList/lts_list.js';

const SelectLtd = ({ data, onChange }) => {
  const [selectedLtd, setSelectedLtd] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [ltdData, setLtdData] = useState([]);
  const [showWindow, setShowWindow] = useState(false);
  const userContext = useContext(UserContext);

  const loadLtd = () => {
    getLTDList()
      .then((res) => {
        setLtdData([...res.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (data) return setLtdData(data);
    loadLtd();
  }, []);

  return (
    <div className="select-ltd">
      <div className="main-form__item">
        <div className="main-form__input_name main-form__input_name--header">
          Данные компании
          <SelectFromButton
            text="Выберите ООО"
            onClick={() => setShowWindow(!showWindow)}
          />
        </div>
        <div className="main-form__input_field">
          <FormWindow
            title="Выбор ООО"
            content={
              <>
                <TableView
                  data={ltdData}
                  userHasAccess={userContext.userHasAccess}
                  onSelect={(item) => {
                    setSelectedLtd(item);
                    onChange(item);
                    setShowWindow(false);
                  }}
                  selectedLtd={selectedLtd}
                  isLoading={isLoading}
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                />
              </>
            }
            showWindow={showWindow}
            setShowWindow={setShowWindow}
          />
          {selectedLtd ? (
            <p>{`${selectedLtd.name} | ИНН: ${selectedLtd.inn}`}</p>
          ) : (
            <span>По умолчанию используются данные Osfix</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectLtd;
