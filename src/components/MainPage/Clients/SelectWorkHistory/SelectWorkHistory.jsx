import { useState, useEffect } from 'react';
import 'Utils/MainWindow/MainWindow.scss';
import 'Components/Form/Form.scss';
import okSVG from 'Assets/tableview/calendar_check.svg';
import cancelSVG from 'Assets/tableview/cancel.svg';
import './SelectWorkHistory.scss';
import InputDate from 'Components/Form/InputDate/InputDate.jsx';
import { formatDateStringWithTime } from 'Utils/functions.jsx';
import ImgLoader from 'Utils/TableView/ImgLoader/ImgLoader.jsx';
import AddToButton from 'Components/Form/AddToButton/AddToButton.jsx';
import NestedFormItem from 'Components/Form/NestedForm/NestedFormItem/NestedFormItem.jsx';
import { sortByField } from 'Utils/sorting/sorting';

const SelectWorkHistory = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [creatingItem, setCreatingItem] = useState(false);
  const defaultItem = {
    date: new Date(),
    action: '',
    result: '',
    comment: '',
  };
  const [newItem, setNewItem] = useState(defaultItem);
  const hints = [
    'Предложение сотрудничества',
    'Отсылка материалов',
    'Обсуждение условий',
    'Техническая консультация',
    'Текущая работа',
    'Заявка',
  ];

  useEffect(() => {
    if (props.defaultValue !== undefined && props.defaultValue.length !== 0) {
      setItems([...props.defaultValue]);
    }
    setNewItem(defaultItem);
  }, [props.defaultValue, props.options]);

  const deleteItem = (id) => {
    let temp = items;
    temp.splice(id, 1);
    setItems([...temp]);
    props.handleWorkHistoryChange([...temp]);
  };

  const handleInputChange = (name, value) => {
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const filterHints = (data, action) => {
    data.filter((hint) => {
      return hint.toLowerCase().includes(action.toLowerCase());
    });
  };

  return (
    <div className="select-work-history">
      <div className="main-form__item">
        <div className="main-form__input_name">История работ</div>
        <div className="main-form__input_field">
          {!props.readOnly && (
            <AddToButton
              text="Добавить запись в историю"
              onClick={() => {
                setCreatingItem(true);
                return setNewItem(defaultItem);
              }}
            />
          )}
        </div>
      </div>
      <div className="main-window">
        {creatingItem ? (
          <NestedFormItem
            isMinimizedDefault={false}
            formInputs={[
              {
                element: (
                  <InputDate
                    inputName="Дата"
                    required
                    name="date"
                    selected={Date.parse(newItem.date)}
                    handleDateChange={(date) =>
                      setNewItem({
                        ...newItem,
                        date: date,
                      })
                    }
                  />
                ),
              },
              {
                name: 'Действие',
                element: (
                  <span
                    className="main-form__input_field"
                    onMouseEnter={() => setShowHints(true)}
                    onMouseLeave={() => setShowHints(false)}
                  >
                    <input
                      type="text"
                      name="action"
                      value={newItem.action}
                      autoComplete="off"
                      onChange={({ target }) =>
                        handleInputChange('action', target.value)
                      }
                    />
                    {filterHints(hints, newItem.action)?.length > 0 && (
                      <div
                        className={
                          showHints
                            ? 'select-work-history__hints-wrapper'
                            : 'select-work-history__hints-wrapper select-work-history__hints-wrapper--hidden'
                        }
                      >
                        {filterHints(hints, newItem.action).map(
                          (hint, index) => (
                            <div
                              key={index}
                              className="select-work-history__hint"
                              name={hint}
                              onClick={() => {
                                setNewItem({
                                  ...newItem,
                                  action: hint,
                                });
                                setShowHints(false);
                              }}
                            >
                              {hint}
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </span>
                ),
              },
              {
                name: 'Результат',
                element: (
                  <input
                    type="text"
                    name="result"
                    value={newItem.result}
                    autoComplete="off"
                    onChange={({ target }) =>
                      handleInputChange('result', target.value)
                    }
                  />
                ),
              },
              {
                name: 'Комментарий',
                element: (
                  <textarea
                    type="text"
                    name="comment"
                    value={newItem.comment}
                    autoComplete="off"
                    onChange={({ target }) =>
                      handleInputChange('comment', target.value)
                    }
                  />
                ),
              },
            ]}
            bottomButton={
              isLoading ? (
                <ImgLoader />
              ) : (
                <div className="main-form__buttons">
                  <span
                    onClick={() => {
                      setIsLoading(true);
                      setItems([...items, newItem]);
                      props.handleWorkHistoryChange([...items, newItem]);
                      setIsLoading(false);
                      setCreatingItem(false);
                    }}
                  >
                    <img className="main-form__img" src={okSVG} />
                    Добавить
                  </span>
                  <span onClick={() => setCreatingItem(false)}>
                    <img className="main-form__img" src={cancelSVG} />
                    Удалить
                  </span>
                </div>
              )
            }
          />
        ) : null}
        {sortByField(items, { fieldName: 'date', direction: 'desc' }).map(
          (item, index) => (
            <NestedFormItem
              key={item.id}
              readOnly={true}
              isMinimizedDefault={true}
              deleteItem={() => deleteItem(index)}
              headerItems={[
                {
                  text: 'Дата',
                  value: formatDateStringWithTime(item.date),
                  style: { flex: '0 1 30%', maxWidth: '130px' },
                  placeholder: 'Не выбрана дата...',
                },
                {
                  text: 'Действие',
                  value: item.action,
                  style: { flex: '0 1 30%' },
                  placeholder: 'Не указано действие...',
                },
                {
                  text: 'Результат',
                  value: item.result,
                  style: { flex: '0 1 50%' },
                  placeholder: 'Не указано действие...',
                },
              ]}
              formInputs={[
                {
                  name: 'Дата',
                  element: (
                    <input
                      type="text"
                      value={formatDateStringWithTime(item.date)}
                      readOnly
                    />
                  ),
                },
                {
                  name: 'Действие',
                  element: <input type="text" value={item.action} readOnly />,
                },
                {
                  name: 'Результат',
                  element: <input type="text" value={item.result} readOnly />,
                },
                {
                  name: 'Комментарий',
                  element: (
                    <textarea type="text" value={item.comment} readOnly />
                  ),
                },
              ]}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default SelectWorkHistory;
