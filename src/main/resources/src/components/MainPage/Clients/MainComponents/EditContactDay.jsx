import React, { useState, useEffect } from "react";
import InputDate from "../../../../utils/Form/InputDate/InputDate.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";

const EditNextContactDate = (props) => {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    props
      .editNextContactDate({
        nextDateContact: new Date(date).getTime() / 1000,
        id: props.selectedItem.id,
      })
      .then(() => {
        setIsLoading(false);
        props.loadData(
          props.selectedItem.category.name,
          props.selectedItem.clientType === "Активные"
            ? "active"
            : props.selectedItem.clientType === "Потенциальные"
            ? "potential"
            : "in-progress"
        );
        props.setCloseWindow(!props.closeWindow);
      });
  };

  useEffect(() => {
    if (
      props.selectedItem.nextDateContact &&
      props.setShowWindow &&
      props.closeWindow === true
    ) {
      props.setShowWindow(false);
    } else {
      setDate(props.selectedItem.nextDateContact);
    }
  }, [props.selectedItem, props.closeWindow]);

  return (
    <div className="main-form">
      <div className="main-form__title">Редактирование даты</div>
      <form className="main-form__form">
        <InputDate
          inputName="Дата след. контакта"
          name="nextContactDate"
          selected={Date.parse(date)}
          handleDateChange={(value) => {
            setDate(value);
          }}
        />
        <div className="main-form__buttons main-form__buttons--full">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => {
              props.setCloseWindow(!props.closeWindow);
            }}
            value="Закрыть"
          />
          <Button
            text="Изменить дату"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditNextContactDate;
