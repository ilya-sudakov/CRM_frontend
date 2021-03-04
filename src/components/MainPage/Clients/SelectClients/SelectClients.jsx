import { useState, useEffect } from 'react';
import './SelectClients.scss';
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import { searchClients } from '../../../../utils/RequestsAPI/Clients.jsx';
import SelectFromButton from '../../../../utils/Form/SelectFromButton/SelectFromButton.jsx';
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';

const SelectClient = (props) => {
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const loadClients = (query) => {
    setIsLoading(true);
    searchClients({
      name: query,
      type: null,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setClients(response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const clickClient = (clientId, clientName) => {
    setId(clientId);
    setName(clientName);
    console.log(clientId);
    props.onChange(clientId);
    setShowWindow(!showWindow);
  };

  return (
    <div className="select-client">
      <div className="select-client__input">
        <div className="select-client__input_name main-form__input_name--header">
          {props.inputName + (props.required ? '*' : '')}
          {!props.readonly && (
            <SelectFromButton
              text="Выбрать клиента"
              onClick={() => setShowWindow(!showWindow)}
            />
          )}
        </div>
        <div className={'select-client__input_field'}>
          {(id !== 0 || props.defaultValue) && (
            <div className="select-client__searchbar">
              <input
                type="text"
                className={
                  props.error === true
                    ? 'select-client__input select-client__input--error'
                    : 'select-client__input'
                }
                value={
                  props.defaultValue && name === '' ? props.defaultValue : name
                }
                placeholder="Выберите клиента, нажав на кнопку 'Выбрать клиента'"
                disabled
              />
            </div>
          )}
        </div>
      </div>
      {props.error === true && (
        <div
          className="select-client__error"
          onClick={
            props.setErrorsArr
              ? () =>
                  props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false,
                  })
              : null
          }
        >
          Поле не заполнено!
        </div>
      )}
      <FormWindow
        title="Клиенты"
        content={
          <React.Fragment>
            <SearchBar
              fullSize
              setSearchQuery={setSearchQuery}
              placeholder="Введите название для поиска..."
              onButtonClick={(query) => {
                if (query === '') {
                  setClients([]);
                }
                if (query.length > 2) {
                  loadClients(query);
                }
              }}
            />
            <TableView
              clients={clients}
              clickClient={clickClient}
              isLoading={isLoading}
              showWindow={showWindow}
              setShowWindow={setShowWindow}
              closeWindow={closeWindow}
              setCloseWindow={setCloseWindow}
            />
          </React.Fragment>
        }
        showWindow={showWindow}
        setShowWindow={setShowWindow}
      />
    </div>
  );
};

export default SelectClient;

const TableView = (props) => {
  useEffect(() => {
    props.setShowWindow && props.setShowWindow(false);
  }, [props.data, props.closeWindow]);

  return (
    <div className="main-window">
      <div className="main-window__list main-window__list--full">
        {props.isLoading ? (
          <PlaceholderLoading
            itemClassName="main-window__list-item"
            minHeight="35px"
            items={3}
          />
        ) : props.clients.length === 0 ? (
          <div style={{ padding: '10px 25px' }}>
            Введите не менее 3 символа для начала поиска
          </div>
        ) : (
          <>
            <div className="main-window__list-item main-window__list-item--header">
              <span>Название</span>
              <span>Сайт</span>
              <span>Контакты</span>
              <span>Комментарий</span>
              <div className="main-window__actions">Действия</div>
            </div>
            {props.clients.map((client, index) => (
              <div
                className="main-window__list-item"
                key={index}
                onClick={() => {
                  props.clickClient(client.id, client.name);
                  props.setCloseWindow(!props.closeWindow);
                }}
              >
                <span>
                  <div className="main-window__mobile-text">Название:</div>
                  {client.name}
                </span>
                <span>
                  <div className="main-window__mobile-text">Сайт:</div>
                  <a
                    className="main-window__link"
                    title={client.site}
                    href={
                      client.site.split('//').length > 1
                        ? client.site
                        : 'https://' + client.site
                    }
                    target="_blank"
                  >
                    {client.site.split('//').length > 1
                      ? client.site.split('//')[1]
                      : client.site}
                  </a>
                </span>
                <span>
                  <div className="main-window__mobile-text">Контакты:</div>
                  {client.contacts?.length > 0
                    ? (client.contacts[0].name !== ''
                        ? client.contacts[0].name + ', '
                        : '') + client.contacts[0].phoneNumber
                    : 'Не указаны контакт. данные'}
                </span>
                <span>
                  <div className="main-window__mobile-text">Комментарий:</div>
                  {client.comment}
                </span>
                <div className="main-window__actions">
                  <div className="main-window__action">Выбрать</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
