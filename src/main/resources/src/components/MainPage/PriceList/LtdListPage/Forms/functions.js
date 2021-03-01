import React from "react";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import {
  getBIKByINN,
  getInfoByINN,
} from "../../../../../utils/RequestsAPI/Clients.jsx";

export const fetchINNData = (
  inputs,
  setIsLoading,
  setFormInputs,
  validateField
) => {
  setIsLoading(true);
  let formData = {};
  //Получаем данные о компании(Головной офис - MAIN BRANCH) по ИНН
  getInfoByINN({ query: inputs.inn, branch_type: "MAIN" })
    .then((res) => res.json())
    .then((res) => {
      if (res.suggestions.length > 0) {
        console.log(res);
        const data = res.suggestions[0].data;
        formData = Object.assign({
          ...inputs,
          name: data.name.full,
          shortName: data.name.short,
          kpp: data.kpp,
          okpo: data.okpo,
          okved: data.okved,
          ogrn: data.ogrn,
          legalAddress: data.address.value,
          generalDirector: data.management?.name,
        });
        validateField("name", data.name.full);
        validateField("shortName", data.name.short);
        validateField("kpp", data.kpp);
        validateField("okpo", data.okpo);
        validateField("okved", data.okved);
        validateField("ogrn", data.ogrn);
        validateField("legalAddress", data.legalAddress);
        validateField("generalDirector", data.generalDirector);
        return formData;
      } else return null;
    })
    .then((newData) => {
      if (newData !== null) {
        //Получаем БИК банка по названию компании
        getBIKByINN({ query: formData.name })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setIsLoading(false);
            validateField(
              "bik",
              res.suggestions.length > 0 ? res.suggestions[0].data.bic : ""
            );
            setFormInputs({
              ...formData,
              bik:
                res.suggestions.length > 0 ? res.suggestions[0].data.bic : "",
            });
            setIsLoading(false);
          });
      } else {
        alert("Не найдено данных с данным ИНН");
        setIsLoading(false);
      }
    });
};

export const ltdFormCreateInput = (options, errors, inputs) => {
  return (
    <InputText
      inputName={options.inputName}
      required={options.required ?? false}
      error={options.required ? errors.formErrors[options.name] : undefined}
      defaultValue={inputs.formInputs[options.name]}
      handleInputChange={({ target }) =>
        inputs.handleInputChange(options.name, target.value)
      }
      errorsArr={options.required ? errors.formErrors : undefined}
      setErrorsArr={options.required ? errors.setFormErrors : undefined}
    />
  );
};
