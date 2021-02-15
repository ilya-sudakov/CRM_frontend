import React, { useState, useEffect } from "react";
import "../../../../utils/MainWindow/MainWindow.scss";
import "../../../../utils/Form/Form.scss";
import deleteSVG from "../../../../../../../../assets/select/delete.svg";
// import okSVG from '../../../../../../../../assets/tableview/ok.svg';
import okSVG from "../../../../../../../../assets/tableview/calendar_check.svg";
import cancelSVG from "../../../../../../../../assets/tableview/cancel.svg";
import "./SelectWorkHistory.scss";
import InputDate from "../../../../utils/Form/InputDate/InputDate.jsx";
import {
  formatDateString,
  formatDateStringWithTime,
} from "../../../../utils/functions.jsx";
import ImgLoader from "../../../../utils/TableView/ImgLoader/ImgLoader.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import NestedFormItem from "../../../../utils/Form/NestedForm/NestedFormItem/NestedFormItem.jsx";

const SelectWorkHistory = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [creatingItem, setCreatingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    date: new Date(),
    action: "",
    result: "",
    comment: "",
  });
  const [hints, setHints] = useState([
    "Предложение сотрудничества",
    "Отсылка материалов",
    "Обсуждение условий",
    "Техническая консультация",
    "Текущая работа",
    "Заявка",
  ]);

  useEffect(() => {
    if (props.defaultValue !== undefined && props.defaultValue.length !== 0) {
      setItems([...props.defaultValue]);
    }
    setNewItem({
      date: new Date(),
      action: "",
      result: "",
      comment: "",
    });
  }, [props.defaultValue, props.options]);

  const deleteItem = (id) => {
    let temp = items;
    temp.splice(id, 1);
    setItems([...temp]);
    props.handleWorkHistoryChange([...temp]);
  };

  const handleInputChange = (event) => {
    const name = event.target.getAttribute("name");
    let value = event.target.value;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  return (
    <div className="select-work-history">
      {!props.readOnly && (
        <Button
          className="main-window__button"
          onClick={() => {
            setCreatingItem(true);
            return setNewItem({
              date: new Date(),
              action: "",
              result: "",
              comment: "",
            });
          }}
          text="Добавить запись в историю"
        />
      )}
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
                    handleDateChange={(date) => {
                      setNewItem({
                        ...newItem,
                        date: date,
                      });
                    }}
                  />
                ),
              },
              {
                name: "Действие",
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
                      onChange={handleInputChange}
                    />
                    {hints.filter((hint) => {
                      return hint
                        .toLowerCase()
                        .includes(newItem.action.toLowerCase());
                    }).length > 0 && (
                      <div
                        className={
                          showHints
                            ? "select-work-history__hints-wrapper"
                            : "select-work-history__hints-wrapper select-work-history__hints-wrapper--hidden"
                        }
                      >
                        {hints
                          .filter((hint) => {
                            return hint
                              .toLowerCase()
                              .includes(newItem.action.toLowerCase());
                          })
                          .map((hint) => {
                            return (
                              <div
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
                            );
                          })}
                      </div>
                    )}
                  </span>
                ),
              },
              {
                name: "Результат",
                element: (
                  <input
                    type="text"
                    name="result"
                    value={newItem.result}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                ),
              },
              {
                name: "Комментарий",
                element: (
                  <textarea
                    type="text"
                    name="comment"
                    value={newItem.comment}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                ),
              },
            ]}
            bottomButton={
              isLoading ? (
                <ImgLoader />
              ) : (
                <div className="main-form__buttons">
                  <span>
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setItems([...items, newItem]);
                        props.handleWorkHistoryChange([...items, newItem]);
                        setIsLoading(false);
                        setCreatingItem(false);
                      }}
                      className="main-form__img"
                      src={okSVG}
                    />
                    Добавить
                  </span>
                  <span>
                    <img
                      onClick={() => setCreatingItem(false)}
                      className="main-form__img"
                      src={cancelSVG}
                    />
                    Удалить
                  </span>
                </div>
              )
            }
          />
        ) : null}
        {items
          .sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) {
              return 1;
            }
            if (new Date(a.date) > new Date(b.date)) {
              return -1;
            }
            return 0;
          })
          .map((item, index) => (
            <NestedFormItem
              index={index}
              readOnly={true}
              isMinimizedDefault={true}
              deleteItem={() => deleteItem(index)}
              headerItems={[
                {
                  text: "Дата",
                  value: formatDateStringWithTime(item.date),
                  style: { flex: "0 1 30%", maxWidth: "130px" },
                  placeholder: "Не выбрана дата...",
                },
                {
                  text: "Действие",
                  value: item.action,
                  style: { flex: "0 1 30%" },
                  placeholder: "Не указано действие...",
                },
                {
                  text: "Результат",
                  value: item.result,
                  style: { flex: "0 1 50%" },
                  placeholder: "Не указано действие...",
                },
              ]}
              formInputs={[
                {
                  name: "Дата",
                  element: (
                    <input
                      type="text"
                      value={formatDateStringWithTime(newItem.date)}
                      readOnly
                    />
                  ),
                },
                {
                  name: "Действие",
                  element: (
                    <input type="text" value={newItem.action} readOnly />
                  ),
                },
                {
                  name: "Результат",
                  element: (
                    <input type="text" value={newItem.result} readOnly />
                  ),
                },
                {
                  name: "Комментарий",
                  element: (
                    <textarea type="text" value={newItem.comment} readOnly />
                  ),
                },
              ]}
            />
          ))}
      </div>
    </div>
  );
};

export default SelectWorkHistory;
