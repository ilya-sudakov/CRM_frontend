import React, { useEffect, useState } from "react";
import "./EditTransportation.scss";
import "../../../../../utils/Form/Form.scss";
import {
  getTransportationById,
  editTransportation,
} from "../../../../../utils/RequestsAPI/Transportation.jsx";
import InputDate from "../../../../../utils/Form/InputDate/InputDate.jsx";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import ErrorMessage from "../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import Button from "../../../../../utils/Form/Button/Button.jsx";

const EditTransportation = (props) => {
  const [transportationInputs, setTransportationInputs] = useState({
    date: new Date(),
    cargo: "",
    quantity: "",
    sender: "ЦехЛЭМЗ",
    recipient: "ЦехЛЭМЗ",
    driver: "",
  });
  const [transportationId, setTransportationId] = useState(1);
  const [transportationErrors, setTransportationErrors] = useState({
    date: false,
    cargo: false,
    sender: false,
    recipient: false,
    driver: false,
  });
  const [validInputs, setValidInputs] = useState({
    date: true,
    cargo: true,
    sender: true,
    recipient: true,
    driver: true,
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "date":
        setValidInputs({
          ...validInputs,
          date: value !== null,
        });
        break;
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== "",
          });
        }
        break;
    }
  };

  const formIsValid = () => {
    let check = true;
    let newErrors = Object.assign({
      date: false,
      cargo: false,
      sender: false,
      recipient: false,
      driver: false,
    });
    for (let item in validInputs) {
      // console.log(item, validInputs[item]);
      if (validInputs[item] === false) {
        check = false;
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        });
      }
    }
    setTransportationErrors(newErrors);
    if (check === true) {
      return true;
    } else {
      // alert("Форма не заполнена");
      setIsLoading(false);
      setShowError(true);
      return false;
    }
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    setIsLoading(true);
    formIsValid() &&
      editTransportation(transportationInputs, transportationId)
        .then(() => props.history.push("/dispatcher/transportation"))
        .catch((error) => {
          setIsLoading(false);
          alert("Ошибка при добавлении записи");
          console.log(error);
        });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setTransportationInputs({
      ...transportationInputs,
      [name]: value,
    });
    setTransportationErrors({
      ...transportationErrors,
      [name]: false,
    });
  };

  const handleDateChange = (date) => {
    const regex = "(0[1-9]|[12]d|3[01]).(0[1-9]|1[0-2]).[12]d{3})";
    validateField("date", date);
    setTransportationInputs({
      ...transportationInputs,
      date: date,
    });
    setTransportationErrors({
      ...transportationErrors,
      date: false,
    });
  };

  useEffect(() => {
    document.title = "Редактирование записи транспортировки";
    const id = props.history.location.pathname.split(
      "/dispatcher/transportation/edit/"
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс транспортировки!");
      props.history.push("/dispatcher/transportation");
    } else {
      setTransportationId(id);
      getTransportationById(id)
        .then((res) => res.json())
        .then((oldRequest) => {
          setTransportationInputs({
            date: oldRequest.date,
            cargo: oldRequest.cargo,
            quantity: oldRequest.quantity,
            sender: oldRequest.sender,
            recipient: oldRequest.recipient,
            driver: oldRequest.driver,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Неправильный индекс транспортировки!");
          props.history.push("/dispatcher/transportation");
        });
    }
  }, []);
  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">
            Редактирование записи транспортировки
          </div>
        </div>
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        <InputDate
          inputName="Дата"
          required
          error={transportationErrors.date}
          name="date"
          selected={Date.parse(transportationInputs.date)}
          handleDateChange={handleDateChange}
          errorsArr={transportationErrors}
          setErrorsArr={setTransportationErrors}
        />

        <div className="main-form__fieldset">
          <div className="main-form__group-name">Данные о грузе</div>
          <InputText
            inputName="Товар"
            required
            error={transportationErrors.cargo}
            name="cargo"
            handleInputChange={handleInputChange}
            defaultValue={transportationInputs.cargo}
            errorsArr={transportationErrors}
            setErrorsArr={setTransportationErrors}
          />
          <InputText
            inputName="Кол-во"
            name="quantity"
            defaultValue={transportationInputs.quantity}
            handleInputChange={handleInputChange}
          />
          <div className="main-form__row">
            <div className="main-form__item">
              <div className="main-form__input_name">Откуда*</div>
              <div className="main-form__input_field">
                <select
                  name="sender"
                  onChange={handleInputChange}
                  value={transportationInputs.sender}
                >
                  <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                  <option value="ЦехЛепсари">ЦехЛепсари</option>
                  <option value="ЦехЛиговский">ЦехЛиговский</option>
                </select>
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Куда*</div>
              <div className="main-form__input_field">
                <select
                  name="recipient"
                  onChange={handleInputChange}
                  value={transportationInputs.recipient}
                >
                  <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                  <option value="ЦехЛепсари">ЦехЛепсари</option>
                  <option value="ЦехЛиговский">ЦехЛиговский</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <InputText
          inputName="Водитель"
          required
          error={transportationErrors.driver}
          name="driver"
          handleInputChange={handleInputChange}
          defaultValue={transportationInputs.driver}
          errorsArr={transportationErrors}
          setErrorsArr={setTransportationErrors}
        />
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => props.history.push("/dispatcher/transportation")}
            value="Вернуться назад"
          />
          {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Редактировать запись" />
                    {isLoading && <ImgLoader />} */}
          <Button
            text="Редактировать запись"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTransportation;
