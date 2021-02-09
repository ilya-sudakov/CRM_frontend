import React, { useState, useEffect } from "react";
import deleteSVG from "../../../../../../../../assets/select/delete.svg";
import Button from "../../../../utils/Form/Button/Button.jsx";
import NestedFormItem from "../../../../utils/Form/NestedForm/NestedFormItem/NestedFormItem.jsx";
import "./SelectContacts.scss";

const SelectContacts = (props) => {
  const [selected, setSelected] = useState([
    {
      name: "",
      lastName: "",
      email: "",
      position: "",
      phoneNumber: "",
      isMinimized: false,
    },
  ]);
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false);

  useEffect(() => {
    if (
      props.defaultValue !== undefined &&
      props.defaultValue.length !== 0 &&
      !defaultValueLoaded
    ) {
      setDefaultValueLoaded(true);
      setSelected([...props.defaultValue]);
    }
  }, [props.defaultValue, selected]);

  const handleNewContact = () => {
    //Открыть по дефолту форму
    const id = selected.length;
    setSelected([
      ...selected,
      {
        name: "",
        lastName: "",
        email: "",
        position: "",
        phoneNumber: "",
        isMinimized: true,
      },
    ]);
    props.handleContactsChange([
      ...selected,
      {
        name: "",
        lastName: "",
        email: "",
        position: "",
        phoneNumber: "",
      },
    ]);
  };

  const deleteContact = (event) => {
    const id = event.target.getAttribute("index");
    let temp = selected;
    temp.splice(id, 1);
    setSelected([...temp]);
    props.handleContactsChange([...temp]);
  };

  const handleInputChange = (event) => {
    const id = event.target.getAttribute("index");
    const name = event.target.getAttribute("name");
    let value = event.target.value;
    let temp = selected;
    let originalItem = selected[id];
    temp.splice(id, 1, {
      ...originalItem,
      [name]: value,
    });
    setSelected([...temp]);
    props.handleContactsChange([...temp]);
  };

  return (
    <div className="select-contacts">
      {!props.readOnly && (
        <Button onClick={handleNewContact} text="Добавить контактное лицо" />
      )}
      <div className="select-contacts__selected">
        {selected.map((item, index) => (
          <NestedFormItem
            item={item}
            index={index}
            readOnly={props.readOnly}
            itemsLength={selected.length}
            handleDeleteItem={deleteContact}
            isMinimizedDefault={props.isMinimizedDefault}
            headerItems={[
              {
                text: "ФИО",
                value:
                  item.lastName === "" && item.name === ""
                    ? ""
                    : `${item.lastName} ${item.name}`,
                placeholder: "Введите ФИО...",
              },
              {
                text: "E-mail",
                value: item.email,
                placeholder: "Введите email...",
              },
              {
                text: "Телефон",
                value: item.phoneNumber,
                placeholder: "Введите телефон...",
              },
            ]}
            formInputs={[
              {
                name: "Имя",
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
                name: "Фамилия",
                element: (
                  <input
                    type="text"
                    name="lastName"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.lastName}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Должность",
                element: (
                  <input
                    type="text"
                    name="position"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.position}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "E-mail",
                element: (
                  <input
                    type="text"
                    name="email"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.email}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Номер телефона",
                element: (
                  <input
                    type="text"
                    name="phoneNumber"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.phoneNumber}
                    readOnly={props.readOnly}
                  />
                ),
              },
            ]}
            handleDeleteItem={deleteContact}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectContacts;
