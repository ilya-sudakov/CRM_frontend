import { useState, useEffect } from 'react';
import './SelectLegalEntity.scss';
import { getInfoByINN, getBIKByINN } from 'Utils/RequestsAPI/Clients.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import NestedFormItem from 'Utils/Form/NestedForm/NestedFormItem/NestedFormItem.jsx';
import AddToButton from 'Utils/Form/AddToButton/AddToButton.jsx';

const SelectLegalEntity = (props) => {
  const newEntity = {
    name: '',
    inn: '',
    kpp: '',
    ogrn: '',
    bik: '',
    checkingAccount: '',
    legalAddress: '',
    factualAddress: '',
    isMinimized: true,
  };
  const [selected, setSelected] = useState([newEntity]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false);

  useEffect(() => {
    if (
      props.defaultValue !== undefined &&
      props.defaultValue.length !== 0 &&
      !defaultValueLoaded
    ) {
      setDefaultValueLoaded(true);
      setSelected([...props.defaultValue]);
    }
    // if (props.options !== undefined) {
    //   setOptions([...props.options])
    // }
  }, [props.defaultValue, selected]);

  const handleNewLegalEntity = () => {
    //Открыть по дефолту форму
    setSelected([...selected, newEntity]);
    props.handleLegalEntityChange([...selected, newEntity]);
  };

  const deleteLegalEntity = (index) => {
    let temp = selected;
    temp.splice(index, 1);
    setSelected([...temp]);
    props.handleLegalEntityChange([...temp]);
  };

  const handleInputChange = (index, name, value) => {
    let temp = selected;
    let originalItem = selected[index];
    temp.splice(index, 1, {
      ...originalItem,
      [name]: value,
    });
    setSelected([...temp]);
    props.handleLegalEntityChange([...temp]);
  };

  const fetchINNData = (item, index) => {
    setIsLoading(true);
    //Получаем данные о компании(Головной офис - MAIN BRANCH) по ИНН
    getInfoByINN({ query: item.inn, branch_type: 'MAIN' })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.suggestions.length > 0) {
          let newData = Object.assign({
            ...item,
            name: res.suggestions[0].data.name.short_with_opf,
            kpp: res.suggestions[0].data.kpp,
            ogrn: res.suggestions[0].data.ogrn,
            legalAddress: res.suggestions[0].data.address.value,
            legalEntity: res.suggestions[0].data.management?.name,
          });
          return newData;
        } else return null;
      })
      .then((newData) => {
        if (newData !== null) {
          //Получаем БИК банка по названию компании
          getBIKByINN({ query: newData.name })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setIsLoading(false);
              let temp = selected;
              temp.splice(index, 1, {
                ...item,
                ...newData,
                bik:
                  res.suggestions.length > 0 ? res.suggestions[0].data.bic : '',
              });
              setSelected([...temp]);
              props.handleLegalEntityChange([...temp]);
              setIsLoading(false);
            });
        } else {
          alert('Не найдено данных с данным ИНН');
          setIsLoading(false);
        }
      });
  };

  const getInputElement = (name, index, item) => {
    return (
      <input
        type="text"
        name={name}
        index={index}
        autoComplete="off"
        onChange={({ target }) => handleInputChange(index, name, target.value)}
        value={item[name]}
        readOnly={props.readOnly}
      />
    );
  };

  return (
    <div className="select-legal-entity">
      <div className="main-form__item">
        <div className="main-form__input_name main-form__input_name--header">
          Юридическое лицо
          {!props.readOnly && (
            <AddToButton
              text="Добавить юридическое лицо"
              onClick={handleNewLegalEntity}
            />
          )}
        </div>
        <div className="select-legal-entity__selected">
          {selected.map((item, index) => (
            <NestedFormItem
              item={item}
              key={index}
              index={index}
              readOnly={props.readOnly}
              itemsLength={selected.length}
              handleDeleteItem={deleteLegalEntity}
              isMinimizedDefault={props.isMinimizedDefault}
              headerItems={[
                {
                  text: 'Название',
                  value: item.name,
                  placeholder: 'Введите название...',
                  style: { flex: '0 1 30%' },
                },
                {
                  text: 'Адрес',
                  value: item.legalAddress,
                  placeholder: 'Введите адрес...',
                  style: { flex: '0 1 50%' },
                },
                {
                  text: 'ИНН',
                  value: item.inn,
                  placeholder: 'Введите ИНН...',
                  style: { flex: '0 1 20%', maxWidth: '120px' },
                },
              ]}
              formInputs={[
                {
                  name: 'Название',
                  element: getInputElement('name', index, item),
                },
                {
                  name: 'ИНН',
                  element: getInputElement('inn', index, item),
                },
                {
                  name: 'КПП',
                  element: getInputElement('kpp', index, item),
                },
                {
                  name: 'ОГРН',
                  element: getInputElement('ogrn', index, item),
                },
                {
                  name: 'БИК',
                  element: getInputElement('bik', index, item),
                },
                {
                  name: 'Расчетный счет',
                  element: getInputElement('checkingAccount', index, item),
                },
                {
                  name: 'Юридический адрес',
                  element: getInputElement('legalAddress', index, item),
                },
                {
                  name: 'Фактический адрес',
                  element: getInputElement('factualAddress', index, item),
                },
              ]}
              bottomButton={
                !props.readOnly && (
                  <Button
                    text="Загрузить данные по ИНН"
                    isLoading={isLoading}
                    className="select-legal-entity__button"
                    onClick={() => fetchINNData(item, index)}
                  />
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectLegalEntity;
