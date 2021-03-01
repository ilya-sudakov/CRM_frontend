import React from "react";
import "./InputUser.scss";
import SelectUser from "../../../components/MainPage/SelectUser/SelectUser.jsx";

const InputUser = (props) => {
  return (
    <div className="input_user">
      <div className="input_user__input">
        <div className="input_user__input_name">
          {props.inputName + (props.required ? "*" : "")}
        </div>
        <div
          className={
            props.error === true
              ? "input_user__input_field input_user__input_field--error"
              : "input_user__input_field"
          }
        >
          <SelectUser
            onChange={props.handleUserChange}
            searchPlaceholder={props.searchPlaceholder}
            defaultValue={props.defaultValue}
            readOnly={props.readOnly}
            userData={props.userData}
            filteredRoles={props.filteredRoles}
          />
        </div>
      </div>
      {props.error === true && (
        <div
          className="input_user__error"
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
    </div>
  );
};

export default InputUser;
