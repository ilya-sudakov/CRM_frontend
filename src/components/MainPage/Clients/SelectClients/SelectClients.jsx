import { useState, useEffect } from 'react';
import './SelectClients.scss';
import { searchClients } from 'API/Clients';
import SelectFromButton from 'Utils/Form/SelectFromButton/SelectFromButton.jsx';
import { useSearchBar, useFormWindow } from 'Utils/hooks';
import Table from 'Components/Table/Table.jsx';

const SelectClient = (props) => {
  const [closeWindow, setCloseWindow] = useState(false);
  const [clients, setClients] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const loadClients = (query) => {
    setIsLoading(true);
    searchClients(
      {
        name: query,
        city: query,
        type: null,
      },
      [selectedOption],
    )
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

  const { searchBar, selectedOption } = useSearchBar(
    undefined,
    [],
    (query) => {
      if (query === '') setClients([]);
      if (query.length > 2) loadClients(query);
    },
    [
      {
        text: 'Везде',
        value: '',
      },
      {
        text: 'Город',
        value: 'city',
      },
    ],
  );

  const getURL = ({ site }) =>
    site && site?.split('//')?.length > 1 ? site : `https://${site}`;
  const formatContacts = ({ contacts }) =>
    contacts?.length > 0
      ? (contacts[0].name !== '' ? `${contacts[0].name}, ` : '') +
        contacts[0].phoneNumber
      : 'Не указаны контакт. данные';

  const columns = [
    { text: 'Название', value: 'name' },
    {
      text: 'Сайт',
      value: 'site',
      link: {
        getURL: getURL,
        isOutside: true,
        newTab: true,
      },
      formatFn: ({ site }) =>
        site && site.split('//').length > 1 ? site.split('//')[1] : site,
    },
    {
      text: 'Контакты',
      value: 'contacts',
      formatFn: formatContacts,
    },
    { text: 'Комментарий', value: 'comment' },
  ];

  const clickClient = ({ id, name }) => {
    setId(id);
    setName(name);
    props.onChange(id);
    toggleFormWindow();
    setCloseWindow(!closeWindow);
  };

  const { formWindow, toggleFormWindow } = useFormWindow(
    'Выбор клиента',
    <>
      {searchBar}
      {clients.length === 0 ? (
        <div style={{ padding: '10px 25px' }}>
          Введите не менее 3 символов для начала поиска
        </div>
      ) : (
        <Table
          columns={columns}
          data={clients}
          loading={{ isLoading }}
          onClick={clickClient}
          options={{ fullSize: true }}
        />
      )}
    </>,
    [closeWindow],
  );

  return (
    <div className="select-client">
      <div className="select-client__input">
        <div className="select-client__input_name main-form__input_name--header">
          {props.inputName + (props.required ? '*' : '')}
          {!props.readonly && (
            <SelectFromButton
              text="Выбрать клиента"
              onClick={() => toggleFormWindow()}
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
      {formWindow}
    </div>
  );
};

export default SelectClient;
