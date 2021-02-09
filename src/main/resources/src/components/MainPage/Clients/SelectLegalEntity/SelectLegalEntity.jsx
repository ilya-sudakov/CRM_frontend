import React, { useState, useEffect } from "react";
import deleteSVG from "../../../../../../../../assets/select/delete.svg";
import "./SelectLegalEntity.scss";
import {
  getInfoByINN,
  getBIKByINN,
} from "../../../../utils/RequestsAPI/Clients.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import ChevronSVG from "../../../../../../../../assets/tableview/chevron-down.inline.svg";
import NestedFormItem from "../../../../utils/Form/NestedForm/NestedFormItem/NestedFormItem.jsx";

const SelectLegalEntity = (props) => {
  const [selected, setSelected] = useState([
    {
      name: "",
      inn: "",
      kpp: "",
      ogrn: "",
      bik: "",
      checkingAccount: "",
      legalAddress: "",
      factualAddress: "",
      isMinimized: false,
    },
  ]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    // if (props.options !== undefined) {
    //   setOptions([...props.options])
    // }
  }, [props.defaultValue, selected]);

  const handleNewLegalEntity = () => {
    //Открыть по дефолту форму
    const id = selected.length;
    setSelected([
      ...selected,
      {
        name: "",
        inn: "7842143789",
        kpp: "",
        ogrn: "",
        bik: "",
        checkingAccount: "",
        legalAddress: "",
        factualAddress: "",
        isMinimized: true,
      },
    ]);
    props.handleLegalEntityChange([
      ...selected,
      {
        name: "",
        inn: "7842143789",
        kpp: "",
        ogrn: "",
        bik: "",
        checkingAccount: "",
        legalAddress: "",
        factualAddress: "",
      },
    ]);
  };

  const deleteLegalEntity = (e) => {
    const id = e.target.getAttribute("index");
    let temp = selected;
    temp.splice(id, 1);
    setSelected([...temp]);
    props.handleLegalEntityChange([...temp]);
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
    props.handleLegalEntityChange([...temp]);
  };

  const onHeaderClick = () => {
    const temp = selected;
    temp.splice(index, 1, {
      ...item,
      isMinimized: !item.isMinimized,
    });
    setSelected([...temp]);
    props.handleLegalEntityChange([...temp]);
  };

  const fetchINNData = (item, index) => {
    setIsLoading(true);
    //Получаем данные о компании(Головной офис - MAIN BRANCH) по ИНН
    getInfoByINN({ query: item.inn, branch_type: "MAIN" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.suggestions.length > 0) {
          let newData = Object.assign({
            ...item,
            name: res.suggestions[0].data.name.short_with_opf,
            kpp: res.suggestions[0].data.kpp,
            ogrn: res.suggestions[0].data.ogrn,
            legalAddress: res.suggestions[0].data.address.value,
            legalEntity: res.suggestions[0].data.management?.name,
          });
          return newData;
        } else return null;
      })
      .then((newData) => {
        if (newData !== null) {
          //Получаем БИК банка по названию компании
          getBIKByINN({ query: newData.name })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setIsLoading(false);
              let temp = selected;
              temp.splice(index, 1, {
                ...item,
                ...newData,
                bik:
                  res.suggestions.length > 0 ? res.suggestions[0].data.bic : "",
              });
              setSelected([...temp]);
              props.handleLegalEntityChange([...temp]);
              setIsLoading(false);
            });
        } else {
          alert("Не найдено данных с данным ИНН");
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="select-legal-entity">
      {!props.readOnly && (
        <Button
          className="select-legal-entity__button"
          onClick={handleNewLegalEntity}
          text="Добавить юридическое лицо"
        />
      )}
      <div className="select-legal-entity__selected">
        {selected.map((item, index) => (
          <NestedFormItem
            item={item}
            index={index}
            readOnly={props.readOnly}
            itemsLength={selected.length}
            handleDeleteItem={deleteLegalEntity}
            headerItems={[
              {
                text: "Название",
                name: "name",
                placeholder: "Введите название...",
                style: { flex: "0 1 30%" },
              },
              {
                text: "Адрес",
                name: "legalAddress",
                placeholder: "Введите адрес...",
                style: { flex: "0 1 80%" },
              },
              {
                text: "ИНН",
                name: "inn",
                placeholder: "Введите ИНН...",
                style: { flex: "0 1 20%", maxWidth: "150px" },
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
                    value={item.name}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "ИНН",
                element: (
                  <input
                    type="text"
                    name="inn"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.inn}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "КПП",
                element: (
                  <input
                    type="text"
                    name="kpp"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.kpp}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "ОГРН",
                element: (
                  <input
                    type="text"
                    name="ogrn"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.ogrn}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "БИК",
                element: (
                  <input
                    type="text"
                    name="bik"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.bik}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Расчетный счет",
                element: (
                  <input
                    type="text"
                    name="checkingAccount"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.checkingAccount}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Юридический адрес",
                element: (
                  <input
                    type="text"
                    name="legalAddress"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.legalAddress}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Фактический адрес",
                element: (
                  <input
                    type="text"
                    name="factualAddress"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.factualAddress}
                    readOnly={props.readOnly}
                  />
                ),
              },
            ]}
            bottomButton={
              !props.readOnly && (
                <Button
                  text="Загрузить данные по ИНН"
                  isLoading={isLoading}
                  className="select-legal-entity__button"
                  onClick={() => fetchINNData(item, index)}
                />
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SelectLegalEntity;
