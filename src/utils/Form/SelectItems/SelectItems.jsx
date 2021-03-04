import { useEffect, useState } from 'react';
import deleteSVG from 'Assets/select/delete.svg';
import AddToButton from '../AddToButton/AddToButton.jsx';
import './SelectItems.scss';

const SelectItems = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    props.defaultValue && setItems([...props.defaultValue]);
  }, [props.defaultValue]);

  const handleInputChange = (index, name, value) => {
    let temp = items;
    temp.splice(index, 1, {
      ...temp[index],
      [name]: value,
    });
    setItems([...temp]);
    props.onChange([...temp]);
  };

  const deleteItem = (event) => {
    let index = event.target.dataset.id;
    let temp = items;
    temp.splice(index, 1);
    setItems([...temp]);
    props.onChange([...temp]);
  };

  const getInputElement = (options, index, item) => {
    return (
      <div>
        <span>{options.title}</span>
        <input
          type={options.type}
          name={options.name}
          onChange={({ target }) =>
            handleInputChange(index, options.name, target.value)
          }
          value={item[options.name]}
          readOnly={props.readOnly}
          placeholder={options.placeholder}
          autoComplete="off"
        />
      </div>
    );
  };

  return (
    <div className="select-items">
      <div className="select-items__input">
        <div className="select-items__input_name">
          {props.inputName + (props.required ? '*' : '')}
          {!props.readOnly && (
            <AddToButton
              text="Добавить элемент"
              onClick={() => {
                let temp = items;
                temp.push({
                  name: '',
                  quantity: '',
                });
                setItems([...temp]);
                props.onChange([...temp]);
              }}
            />
          )}
        </div>
        <div className="select-items__input-field">
          <div className="select-items__list">
            {props.error === true && (
              <div
                className="select-items__error"
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
            {items.map((item, index) => {
              return (
                <div className="select-items__list-item">
                  {getInputElement(
                    {
                      title: 'Название',
                      placeholder: 'Введите название...',
                      type: 'text',
                      name: 'name',
                    },
                    index,
                    item,
                  )}
                  {getInputElement(
                    {
                      title: 'Кол-во',
                      placeholder: 'Введите кол-во...',
                      type: 'number',
                      name: 'quantity',
                    },
                    index,
                    item,
                  )}
                  {!props.readOnly && (
                    <img
                      src={deleteSVG}
                      className="select-items__img"
                      onClick={deleteItem}
                      data-id={index}
                      title="Удалить элемент"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectItems;
