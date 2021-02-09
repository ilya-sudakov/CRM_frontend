import React, { useState, useEffect } from "react";
import deleteSVG from "../../../../../../../../../assets/select/delete.svg";
import "./SelectParts.scss";
import {
  workshopsLocations,
  checkRiggingTypesInputs,
} from "../RiggingComponents/rigsVariables";
import Button from "../../../../../utils/Form/Button/Button.jsx";
import NestedFormItem from "../../../../../utils/Form/NestedForm/NestedFormItem/NestedFormItem.jsx";
import { scrollToElement } from "../../../../../utils/functions.jsx";

const SelectParts = (props) => {
  const [selected, setSelected] = useState([]);
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (props.defaultValue !== undefined && !defaultValueLoaded) {
      setSelected([...props.defaultValue]);
      setDefaultValueLoaded(true);
    }
  }, [props.defaultValue, selected]);

  useEffect(() => {
    const titleElement = document.getElementById(props.scrollToId);
    if (titleElement && !hasScrolled) {
      scrollToElement(titleElement, -10);
      setHasScrolled(true);
    }
  }, [props.scrollToId, selected]);

  const handleNewPart = () => {
    setSelected([
      ...selected,
      {
        number: "",
        name: "",
        amount: "",
        location: "lemz",
        comment: "",
        cuttingDimensions: "",
        milling: "",
        harding: "",
        grinding: "",
        erosion: "",
        controll: "",
        color: "production",
        isMinimized: true,
      },
    ]);
    props.handlePartsChange([
      ...selected,
      {
        number: "",
        name: "",
        amount: "",
        location: "lemz",
        comment: "",
        cuttingDimensions: "",
        milling: "",
        harding: "",
        grinding: "",
        erosion: "",
        controll: "",
        color: "production",
      },
    ]);
  };

  const deletePart = (id) => {
    let temp = selected;
    temp.splice(id, 1);
    setSelected([...temp]);
    props.handlePartsChange([...temp]);
  };

  const handleInputChange = (event) => {
    const id = event.target.getAttribute("index");
    const name = event.target.getAttribute("name");
    const value = event.target.value;
    let temp = selected;
    let originalItem = selected[id];
    temp.splice(id, 1, {
      ...originalItem,
      [name]: value,
    });
    setSelected([...temp]);
    props.handlePartsChange([...temp]);
  };

  return (
    <div className="select_parts">
      {!props.readOnly && (
        <Button text="Добавить деталь" onClick={handleNewPart} />
      )}
      <div className="select_parts__selected">
        {selected.map((item, index) => (
          <NestedFormItem
            readOnly={props.readOnly}
            index={index}
            id={item.id}
            itemsLength={selected.length}
            isMinimizedDefault={
              item.id === Number.parseInt(props.scrollToId)
                ? false
                : props.isMinimizedDefault
            }
            handleDeleteItem={() => deletePart(index)}
            headerItems={[
              {
                text: "Название",
                value: item.name,
                placeholder: "Введите название...",
              },
              {
                text: "Артикул",
                value: item.number,
                placeholder: "Введите артикул...",
              },
              {
                text: "Комментарий",
                value: item.comment,
                placeholder: "Введите комментарий...",
              },
            ]}
            formInputs={[
              {
                name: "Название",
                element: (
                  <input
                    type="text"
                    name="name"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.name}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Артикул",
                element: (
                  <input
                    type="text"
                    name="number"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.number}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Кол-во",
                element: (
                  <input
                    type="text"
                    name="amount"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.amount}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Местоположение",
                element: (
                  <select
                    index={index}
                    name="location"
                    onChange={handleInputChange}
                    value={item.location}
                    disabled={props.readOnly}
                  >
                    {Object.entries(workshopsLocations).map((workshop) => (
                      <option value={workshop[0]}>{workshop[1].name}</option>
                    ))}
                  </select>
                ),
              },
              {
                name: "Комментарий",
                element: (
                  <input
                    type="text"
                    name="comment"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.comment}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Распил/Габариты",
                element: (
                  <input
                    type="text"
                    name="cuttingDimensions"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.cuttingDimensions}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly &&
                      !checkRiggingTypesInputs(item, "cuttingDimensions")
                    }
                  />
                ),
              },
              {
                name: "Фрезеровка/Точение",
                element: (
                  <input
                    type="text"
                    index={index}
                    name="milling"
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.milling}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly &&
                      !checkRiggingTypesInputs(item, "milling")
                    }
                  />
                ),
              },
              {
                name: "Закалка",
                element: (
                  <input
                    type="text"
                    index={index}
                    name="harding"
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.harding}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly &&
                      !checkRiggingTypesInputs(item, "harding")
                    }
                  />
                ),
              },
              {
                name: "Шлифовка",
                element: (
                  <input
                    type="text"
                    index={index}
                    name="grinding"
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.grinding}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly &&
                      !checkRiggingTypesInputs(item, "grinding")
                    }
                  />
                ),
              },
              {
                name: "Эрозия",
                element: (
                  <input
                    type="text"
                    name="erosion"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.erosion}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly &&
                      !checkRiggingTypesInputs(item, "erosion")
                    }
                  />
                ),
              },
              {
                name: "Проверка",
                element: (
                  <input
                    type="text"
                    name="controll"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.controll}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly &&
                      !checkRiggingTypesInputs(item, "controll")
                    }
                  />
                ),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectParts;
