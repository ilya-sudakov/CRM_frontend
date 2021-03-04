import { useState, useEffect } from 'react';
import './SelectParts.scss';
import {
  workshopsLocations,
  checkRiggingTypesInputs,
} from '../RiggingComponents/rigsVariables';
import NestedFormItem from 'Utils/Form/NestedForm/NestedFormItem/NestedFormItem.jsx';
import { scrollToElement } from 'Utils/functions.jsx';
import AddToButton from 'Utils/Form/AddToButton/AddToButton.jsx';

const SelectParts = (props) => {
  const [selected, setSelected] = useState([]);
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (props.defaultValue !== undefined && !defaultValueLoaded) {
      setSelected([...props.defaultValue]);
      setDefaultValueLoaded(true);
    }
  }, [props.defaultValue, selected]);

  useEffect(() => {
    const titleElement = document.getElementById(props.scrollToId);
    if (titleElement && !hasScrolled) {
      scrollToElement(titleElement, -10);
      setHasScrolled(true);
    }
  }, [props.scrollToId, selected]);

  const handleNewPart = () => {
    const newPart = {
      number: '',
      name: '',
      amount: '',
      location: 'lemz',
      comment: '',
      cuttingDimensions: '',
      milling: '',
      harding: '',
      grinding: '',
      erosion: '',
      controll: '',
      color: 'production',
      isMinimized: true,
    };
    setSelected([...selected, newPart]);
    props.handlePartsChange([...selected, newPart]);
  };

  const deletePart = (id) => {
    let temp = selected;
    temp.splice(id, 1);
    setSelected([...temp]);
    props.handlePartsChange([...temp]);
  };

  const handleInputChange = (item, name, value) => {
    let temp = selected;
    const id = selected.indexOf(item);
    temp.splice(id, 1, {
      ...item,
      [name]: value,
    });
    setSelected([...temp]);
    props.handlePartsChange([...temp]);
  };

  const getInputElement = (name, item, disabled = false) => {
    return (
      <input
        type="text"
        name={name}
        autoComplete="off"
        onChange={({ target }) => handleInputChange(item, name, target.value)}
        defaultValue={item[name]}
        readOnly={props.readOnly}
        disabled={disabled}
      />
    );
  };

  return (
    <div className="select_parts">
      <div className="main-form__item">
        <div className="main-form__input_name main-form__input_name--header">
          Детали*
          {!props.readOnly && (
            <AddToButton text="Добавить деталь" onClick={handleNewPart} />
          )}
        </div>
        <div className="main-form__input_field">
          <div className="select_parts__selected">
            {selected.map((item, index) => (
              <NestedFormItem
                readOnly={props.readOnly}
                index={index}
                id={item.id}
                itemsLength={selected.length}
                isMinimizedDefault={
                  item.id === Number.parseInt(props.scrollToId)
                    ? false
                    : props.isMinimizedDefault
                }
                handleDeleteItem={deletePart}
                headerItems={[
                  {
                    text: 'Название',
                    value: item.name,
                    placeholder: 'Введите название...',
                  },
                  {
                    text: 'Артикул',
                    value: item.number,
                    placeholder: 'Введите артикул...',
                  },
                  {
                    text: 'Комментарий',
                    value: item.comment,
                    placeholder: 'Введите комментарий...',
                  },
                ]}
                formInputs={[
                  {
                    name: 'Название',
                    element: getInputElement('name', item),
                  },
                  {
                    name: 'Артикул',
                    element: getInputElement('number', item),
                  },
                  {
                    name: 'Кол-во',
                    element: getInputElement('amount', item),
                  },
                  {
                    name: 'Местоположение',
                    element: (
                      <select
                        name="location"
                        onChange={({ target }) =>
                          handleInputChange(item, 'location', target.value)
                        }
                        value={item.location}
                        disabled={props.readOnly}
                      >
                        {Object.entries(workshopsLocations).map((workshop) => (
                          <option value={workshop[0]}>
                            {workshop[1].name}
                          </option>
                        ))}
                      </select>
                    ),
                  },
                  {
                    name: 'Комментарий',
                    element: getInputElement('comment', item),
                  },
                  {
                    name: 'Распил/Габариты',
                    element: getInputElement(
                      'cuttingDimensions',
                      item,
                      !props.readOnly &&
                        !checkRiggingTypesInputs(item, 'cuttingDimensions'),
                    ),
                  },
                  {
                    name: 'Фрезеровка/Точение',
                    element: getInputElement(
                      'milling',
                      item,
                      !props.readOnly &&
                        !checkRiggingTypesInputs(item, 'milling'),
                    ),
                  },
                  {
                    name: 'Закалка',
                    element: getInputElement(
                      'harding',
                      item,
                      !props.readOnly &&
                        !checkRiggingTypesInputs(item, 'harding'),
                    ),
                  },
                  {
                    name: 'Шлифовка',
                    element: getInputElement(
                      'grinding',
                      item,
                      !props.readOnly &&
                        !checkRiggingTypesInputs(item, 'grinding'),
                    ),
                  },
                  {
                    name: 'Эрозия',
                    element: getInputElement(
                      'erosion',
                      item,
                      !props.readOnly &&
                        !checkRiggingTypesInputs(item, 'erosion'),
                    ),
                  },
                  {
                    name: 'Проверка',
                    element: getInputElement(
                      'controll',
                      item,
                      !props.readOnly &&
                        !checkRiggingTypesInputs(item, 'controll'),
                    ),
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectParts;
