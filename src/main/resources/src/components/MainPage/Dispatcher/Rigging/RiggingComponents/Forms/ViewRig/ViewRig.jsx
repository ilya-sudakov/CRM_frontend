import React, { useState, useEffect } from "react";
import "./ViewRig.scss";
import "../../../../../../../utils/Form/Form.scss";
import SelectParts from "../../../SelectParts/SelectParts.jsx";
import { getStampById } from "../../../../../../../utils/RequestsAPI/Rigging/Stamp.jsx";
import { formatDateString } from "../../../../../../../utils/functions.jsx";
import { rigTypes } from "../../rigsVariables.js";

const ViewRig = (props) => {
  const [rigInputs, setRigInputs] = useState({
    name: "",
    number: "",
    comment: "",
    parts: [],
    lastEdited: new Date(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.history.push(`${rigTypes[props.type].redirectURL}#${rigInputs.id}`);
  };

  useEffect(() => {
    document.title = `Просмотр записи`;
    const id = props.history.location.pathname.split("/view/")[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс!");
      props.history.push(rigTypes[props.type].redirectURL);
    } else {
      getStampById(id)
        .then((res) => res.json())
        .then((res) => {
          setRigInputs(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="view-rig">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Просмотр записи`}</div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">
              Название оснастки(оборудования)
            </div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="name"
                autoComplete="off"
                readOnly
                defaultValue={rigInputs.name}
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">
              Артикул оснастки(оборудования)
            </div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="number"
                autoComplete="off"
                readOnly
                defaultValue={rigInputs.number}
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Комментарий</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="comment"
                autoComplete="off"
                readOnly
                defaultValue={rigInputs.comment}
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Детали</div>
            <div className="main-form__input_field">
              <SelectParts
                readOnly
                defaultValue={rigInputs.stampParts}
                isMinimizedDefault={true}
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">
              Дата последнего изменения
            </div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="lastEdited"
                autoComplete="off"
                readOnly
                defaultValue={formatDateString(rigInputs.lastEdited)}
              />
            </div>
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={handleSubmit}
              value="Вернуться назад"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewRig;
