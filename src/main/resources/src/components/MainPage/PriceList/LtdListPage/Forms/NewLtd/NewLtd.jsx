import React, { useState, useEffect } from "react";
import "./NewLtd.scss";
import ErrorMessage from "../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import InputText from "../../../../../../utils/Form/InputText/InputText.jsx";
import Button from "../../../../../../utils/Form/Button/Button.jsx";
import { addLTD } from "../../../../../../utils/RequestsAPI/PriceList/lts_list.js";
import FileUploader from "../../../../../../utils/Form/FileUploader/FileUploader.jsx";
import { fetchINNData, ltdFormCreateInput } from "../functions";
import { ltdListDefaultInputObject } from "../objects";

const NewLtd = (props) => {
  const [formInputs, setFormInputs] = useState({
    name: "",
    shortName: "",
    legalAddress: "",
    mailingAddress: "",
    phone: "",
    site: "",
    inn: "",
    kpp: "",
    ogrn: "",
    okpo: "",
    okved: "",
    email: "",
    checkingAccount: "",
    bank: "",
    correspondentAccount: "",
    bik: "",
    generalDirector: "",
    accountant: "",
    logo: "",
  });
  const [formErrors, setFormErrors] = useState(ltdListDefaultInputObject);
  const [validInputs, setValidInputs] = useState(ltdListDefaultInputObject);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validateField = (fieldName, value) => {
    console.log(fieldName, value);
    switch (fieldName) {
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== "" && value !== undefined,
          });
        }
        break;
    }
  };
  const formIsValid = () => {
    let check = true;
    let newErrors = ltdListDefaultInputObject;
    for (let item in validInputs) {
      if (formInputs[item] === "") {
        check = false;
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        });
      }
    }
    setFormErrors(newErrors);
    if (check === true) {
      return true;
    } else {
      setIsLoading(false);
      setShowError(true);
      return false;
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(formInputs);
    console.log(validInputs);
    formIsValid() &&
      addLTD(formInputs)
        .then(() => props.history.push("/ltd-list"))
        .catch((error) => {
          setIsLoading(false);
          alert("Ошибка при добавлении записи");
        });
  };

  const handleInputChange = (name, value) => {
    validateField(name, value);
    setFormInputs((formInputs) => {
      return {
        ...formInputs,
        [name]: value,
      };
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  useEffect(() => {
    document.title = "Добавление ООО";
  }, [validInputs]);

  const getInputsListFromArray = (array) => {
    return array.map((input) =>
      input.custom
        ? input.custom
        : ltdFormCreateInput(
            input,
            {
              formErrors: formErrors,
              setFormErrors: setFormErrors,
            },
            {
              formInputs: formInputs,
              handleInputChange: (name, value) =>
                handleInputChange(name, value),
            }
          )
    );
  };

  const nameInputs = [
    { name: "name", inputName: "Наименование", required: true },
    { name: "shortName", inputName: "Краткое наименование" },
  ];

  const addressInputs = [
    { name: "legalAddress", inputName: "Юридический адрес", required: true },
    { name: "mailingAddress", inputName: "Почтовый адрес", required: true },
  ];

  const contactsInputs = [
    { name: "phone", inputName: "Телефон", required: true },
    { name: "email", inputName: "E-mail", required: true },
  ];

  const allOtherInputs = [
    { name: "inn", inputName: "ИНН", required: true },
    {
      custom: (
        <Button
          text="Загрузить данные по ИНН"
          className="main-window__button main-window__button--inverted"
          inverted
          onClick={() =>
            fetchINNData(
              formInputs,
              setIsLoading,
              setFormInputs,
              (name, value) => validateField(name, value)
            )
          }
          isLoading={isLoading}
          style={{ margin: "-15px auto 20px 10px" }}
        />
      ),
    },
    { name: "kpp", inputName: "КПП", required: true },
    { name: "ogrn", inputName: "ОГРН", required: true },
    { name: "okpo", inputName: "ОКПО", required: true },
    { name: "okved", inputName: "ОКВЭД", required: true },
    { name: "okpo", inputName: "ОКПО", required: true },
    { name: "okpo", inputName: "ОКПО", required: true },
  ];

  const bankInputs = [
    { name: "checkingAccount", inputName: "Расчетный счет №", required: true },
    { name: "bank", inputName: "Банк", required: true },
    {
      name: "correspondentAccount",
      inputName: "Корреспондентский счет",
      required: true,
    },
    { name: "bik", inputName: "БИК", required: true },
  ];

  const employeesInputs = [
    {
      name: "generalDirector",
      inputName: "Генеральный директор",
      required: true,
    },
    { name: "accountant", inputName: "Главный бухгалтер", required: true },
  ];

  return (
    <div className="new-ltd">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Добавление ООО</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          {getInputsListFromArray(nameInputs)}
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Адреса</div>
            <div className="main-form__group-content">
              {getInputsListFromArray(addressInputs)}
            </div>
          </div>
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Контактные данные</div>
            <div className="main-form__group-content">
              {getInputsListFromArray(contactsInputs)}
            </div>
          </div>
          {getInputsListFromArray(allOtherInputs)}
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Банковская информация</div>
            {getInputsListFromArray(bankInputs)}
          </div>
          {getInputsListFromArray(employeesInputs)}
          <div className="main-form__item">
            <div className="main-form__input_name">Лого*</div>
            <FileUploader
              previewImage={formInputs.logo}
              error={formErrors.logo}
              onChange={(value) => handleInputChange("logo", value)}
              hideError={() => setFormErrors({ ...formErrors, logo: false })}
            />
          </div>
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              inverted
              isLoading={isLoading}
              className="main-form__submit main-form__submit--inverted"
              onClick={() => props.history.push("/ltd-list")}
              text="Вернуться назад"
            />
            <Button
              text="Добавить запись"
              isLoading={isLoading}
              className="main-form__submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewLtd;
