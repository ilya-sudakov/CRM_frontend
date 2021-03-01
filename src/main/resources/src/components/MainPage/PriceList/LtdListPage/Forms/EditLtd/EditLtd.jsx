import React, { useState, useEffect } from "react";
import "./EditLtd.scss";
import ErrorMessage from "../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import InputText from "../../../../../../utils/Form/InputText/InputText.jsx";
import Button from "../../../../../../utils/Form/Button/Button.jsx";
import {
  addLTD,
  getLTDById,
} from "../../../../../../utils/RequestsAPI/PriceList/lts_list.js";
import FileUploader from "../../../../../../utils/Form/FileUploader/FileUploader.jsx";
import { fetchINNData, getInputsListFromArray } from "../functions.js";
import {
  ltdFormAddressInputs,
  ltdFormBankInputs,
  ltdFormContactsInputs,
  ltdFormEmployeesInputs,
  ltdFormNameInputs,
  ltdListDefaultInputObject,
  ltdListDefaultInputObjectValues,
} from "../objects.js";

const EditLtd = (props) => {
  const [formInputs, setFormInputs] = useState(ltdListDefaultInputObjectValues);
  const [formErrors, setFormErrors] = useState(ltdListDefaultInputObject);
  const [validInputs, setValidInputs] = useState(ltdListDefaultInputObject);

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
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
    let newErrors = ltdListDefaultInputObject;
    for (let item in validInputs) {
      // if (validInputs[item] === false) {
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
      // alert("Форма не заполнена");
      setIsLoading(false);
      setShowError(true);
      return false;
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(formInputs);
    formIsValid() &&
      addLTD(formInputs)
        .then(() => {})
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
    document.title = "Редактирование ООО";
    const id = props.history.location.pathname.split("/ltd-list/edit/")[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс!");
      props.history.push("/ltd-list");
    } else {
      getLTDById(id)
        .then((data) => {
          return setFormInputs({
            ...data.data,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Неправильный индекс!");
          props.history.push("/ltd-list");
        });
    }
  }, []);

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

  const defaultInputsListParams = [
    { formErrors: formErrors, setFormErrors: setFormErrors },
    { formInputs: formInputs, handleInputChange: handleInputChange },
  ];

  return (
    <div className="new-packaging">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Редактирование ООО</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          {getInputsListFromArray(
            ltdFormNameInputs,
            ...defaultInputsListParams
          )}
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Адреса</div>
            {getInputsListFromArray(
              ltdFormAddressInputs,
              ...defaultInputsListParams
            )}
          </div>
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Контактные данные</div>
            <div className="main-form__group-content">
              {getInputsListFromArray(
                ltdFormContactsInputs,
                ...defaultInputsListParams
              )}
            </div>
          </div>
          {getInputsListFromArray(allOtherInputs, ...defaultInputsListParams)}
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Банковская информация</div>
            {getInputsListFromArray(
              ltdFormBankInputs,
              ...defaultInputsListParams
            )}
          </div>
          {getInputsListFromArray(
            ltdFormEmployeesInputs,
            ...defaultInputsListParams
          )}
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
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => props.history.push("/ltd-list")}
              value="Вернуться назад"
            />
            <Button
              text="Редактировать запись"
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

export default EditLtd;
