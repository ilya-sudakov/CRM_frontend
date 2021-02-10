import React, { useState, useEffect } from "react";
import deleteSVG from "../../../../../../../../assets/select/delete.svg";
import "./SelectPriceItem.scss";
import FileUploader from "../../../../utils/Form/FileUploader/FileUploader.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import { getDataUri } from "../../../../utils/functions.jsx";
import NestedFormItem from "../../../../utils/Form/NestedForm/NestedFormItem/NestedFormItem.jsx";

const SelectPriceItem = (props) => {
  // const [imgName, setImgName] = useState("Имя файла...");
  const [selected, setSelected] = useState([
    {
      number: "",
      units: "",
      name: "",
      description: "",
      retailPrice: 0,
      lessThan1500Price: 0,
      lessThan5000Price: 0,
      retailMarketPrice: 0,
      cost: 0,
      dealerPrice: 0,
      distributorPrice: 0,
      partnerPrice: 0,
      stopPrice: 0,
      onSale: false,
      isTopSeller: false,
      isMinimized: true,
    },
  ]);
  const [options, setOptions] = useState([]);
  const [proprietaryItem, setProprietaryItem] = useState(false);
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false);
  const [coefficients, setCoefficients] = useState({
    retailPrice: 1,
    dealerPrice: 0.56,
    distributorPrice: 0.485,
    partnerPrice: 0.79,
    stopPrice: 0.4545,
    lessThan5000Price: 0.89,
    lessThan1500Price: 0.96,
  });
  const [groupImg1, setGroupImg1] = useState(null);
  const [groupImg2, setGroupImg2] = useState(null);
  const [groupImg3, setGroupImg3] = useState(null);
  const [groupImg4, setGroupImg4] = useState(null);
  const [footerImg, setFooterImg] = useState(null);
  // const [visibleItems, setVisibleItems] = useState([{
  //     id:
  // }])

  useEffect(() => {
    if (props.defaultValue !== undefined && !defaultValueLoaded) {
      setSelected([
        ...props.defaultValue.map((item) => {
          return Object.assign({ ...item, isMinimized: true });
        }),
      ]);
      setDefaultValueLoaded(true);
    }
    if (props.options !== undefined) {
      setOptions([...props.options]);
    }
    if (props.groupImg1 !== undefined) {
      setGroupImg1(props.groupImg1);
    }
    if (props.groupImg2 !== undefined) {
      setGroupImg2(props.groupImg2);
    }
    if (props.groupImg3 !== undefined) {
      setGroupImg3(props.groupImg3);
    }
    if (props.groupImg4 !== undefined) {
      setGroupImg4(props.groupImg4);
    }
    if (props.footerImg !== undefined) {
      setFooterImg(props.footerImg);
    }
    if (props.proprietaryItem !== undefined) {
      setProprietaryItem(props.proprietaryItem);
    }
  }, [
    props.defaultValue,
    props.options,
    props.groupImg1,
    props.groupImg2,
    props.groupImg3,
    props.groupImg4,
    props.footerImg,
    selected,
  ]);

  const handleNewPriceItem = () => {
    //Открыть по дефолту форму
    const id = selected.length;
    const newObject = {
      number: "",
      units: "",
      name: "",
      description: "",
      retailPrice: 0,
      lessThan1500Price: 0,
      lessThan5000Price: 0,
      retailMarketPrice: 0,
      cost: 0,
      dealerPrice: 0,
      distributorPrice: 0,
      partnerPrice: 0,
      stopPrice: 0,
      onSale: false,
      isTopSeller: false,
      isMinimized: true,
    };
    setSelected([...selected, newObject]);
    props.handlePriceItemChange([...selected, newObject]);
  };

  const deletePriceItem = (index) => {
    let temp = selected;
    temp.splice(index, 1);
    setSelected([...temp]);
    props.handlePriceItemChange([...temp]);
  };

  const handleInputChange = (event) => {
    const id = event.target.getAttribute("index");
    const name = event.target.getAttribute("name");
    let value = event.target.value;
    let temp = selected;
    let originalItem = selected[id];
    if (name === "cost") {
      value = parseFloat(value);
      temp.splice(id, 1, {
        ...originalItem,
        [name]: value,
        retailPrice: originalItem.retailMarketPrice,
        dealerPrice: (
          value +
          (originalItem.retailMarketPrice - value) * coefficients.dealerPrice
        ).toFixed(2),
        distributorPrice: (
          value +
          (originalItem.retailMarketPrice - value) *
            coefficients.distributorPrice
        ).toFixed(2),
        partnerPrice: (
          value +
          (originalItem.retailMarketPrice - value) * coefficients.partnerPrice
        ).toFixed(2),
        stopPrice: (
          value +
          (originalItem.retailMarketPrice - value) * coefficients.stopPrice
        ).toFixed(2),
        lessThan5000Price: (
          value +
          (originalItem.retailMarketPrice - value) *
            coefficients.lessThan5000Price
        ).toFixed(2),
        lessThan1500Price: (
          value +
          (originalItem.retailMarketPrice - value) *
            coefficients.lessThan1500Price
        ).toFixed(2),
      });
      setSelected([...temp]);
      props.handlePriceItemChange([...temp]);
    } else if (name === "retailMarketPrice") {
      value = parseFloat(value);
      temp.splice(id, 1, {
        ...originalItem,
        [name]: value,
        retailPrice: value,
        dealerPrice: (
          originalItem.cost +
          (value - originalItem.cost) * coefficients.dealerPrice
        ).toFixed(2),
        distributorPrice: (
          originalItem.cost +
          (value - originalItem.cost) * coefficients.distributorPrice
        ).toFixed(2),
        partnerPrice: (
          originalItem.cost +
          (value - originalItem.cost) * coefficients.partnerPrice
        ).toFixed(2),
        stopPrice: (
          originalItem.cost +
          (value - originalItem.cost) * coefficients.stopPrice
        ).toFixed(2),
        lessThan5000Price: (
          originalItem.cost +
          (value - originalItem.cost) * coefficients.lessThan5000Price
        ).toFixed(2),
        lessThan1500Price: (
          originalItem.cost +
          (value - originalItem.cost) * coefficients.lessThan1500Price
        ).toFixed(2),
      });
      setSelected([...temp]);
      props.handlePriceItemChange([...temp]);
    } else {
      temp.splice(id, 1, {
        ...originalItem,
        [name]: value,
      });
      setSelected([...temp]);
      props.handlePriceItemChange([...temp]);
    }
  };

  return (
    <div className="select-price-item">
      <div className="select-price-item__selected">
        {!props.readOnly && (
          <div className="price-list__images-wrapper">
            <div className="main-form__item">
              <div className="main-form__input_name">Фотография 1</div>
              <div className="main-form__input_field">
                {!props.readOnly && (
                  <FileUploader
                    uniqueId={"file1" + props.uniqueId}
                    onChange={async (result) => {
                      const downgraded =
                        result !== ""
                          ? await getDataUri(result, "jpeg", 0.3)
                          : "";
                      setGroupImg1(downgraded);
                      props.handleImgChange(downgraded, "groupImg1");
                    }}
                    previewImage={groupImg1}
                  />
                )}
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Фотография 2</div>
              <div className="main-form__input_field">
                {!props.readOnly && (
                  <FileUploader
                    uniqueId={"file2" + props.uniqueId}
                    onChange={async (result) => {
                      const downgraded =
                        result !== ""
                          ? await getDataUri(result, "jpeg", 0.3)
                          : "";
                      setGroupImg2(downgraded);
                      props.handleImgChange(downgraded, "groupImg2");
                    }}
                    previewImage={groupImg2}
                  />
                )}
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Фотография 3</div>
              <div className="main-form__input_field">
                {!props.readOnly && (
                  <FileUploader
                    uniqueId={"file3" + props.uniqueId}
                    onChange={async (result) => {
                      const downgraded =
                        result !== ""
                          ? await getDataUri(result, "jpeg", 0.3)
                          : "";
                      setGroupImg3(downgraded);
                      props.handleImgChange(downgraded, "groupImg3");
                    }}
                    previewImage={groupImg3}
                  />
                )}
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Фотография 4</div>
              <div className="main-form__input_field">
                {!props.readOnly && (
                  <FileUploader
                    uniqueId={"file4" + props.uniqueId}
                    onChange={async (result) => {
                      const downgraded =
                        result !== ""
                          ? await getDataUri(result, "jpeg", 0.3)
                          : "";
                      setGroupImg4(downgraded);
                      props.handleImgChange(downgraded, "groupImg4");
                    }}
                    previewImage={groupImg4}
                  />
                )}
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Фотография снизу</div>
              <div className="main-form__input_field">
                {!props.readOnly && (
                  <FileUploader
                    uniqueId={"file5" + props.uniqueId}
                    onChange={async (result) => {
                      const downgraded =
                        result !== ""
                          ? await getDataUri(result, "jpeg", 0.3)
                          : "";
                      setFooterImg(downgraded);
                      props.handleImgChange(downgraded, "footerImg");
                    }}
                    previewImage={footerImg}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {!props.readOnly && (
          <Button
            className="main-window__button"
            onClick={handleNewPriceItem}
            text="Добавить продукцию"
          />
        )}
        {selected.map((item, index) => (
          <NestedFormItem
            index={index}
            itemsLength={selected.length}
            handleDeleteItem={deletePriceItem}
            isMinimizedDefault={true}
            headerItems={[
              {
                text: "Артикул",
                value: item.number,
                placeholder: "Введите артикул...",
                style: { flex: " 0 1 15%" },
              },
              {
                text: "Описание",
                value: item.description,
                placeholder: "Введите описание...",
                style: { flex: " 0 1 40%" },
              },
              {
                text: "Розница",
                value: item.retailPrice,
                placeholder: "Введите розн. цену...",
                style: { flex: " 0 1 15%" },
              },
              {
                text: "до 1500 шт.",
                value: item.lessThan1500Price,
                placeholder: "Введите цену до 1500шт...",
                style: { flex: " 0 1 15%" },
              },
              {
                text: "до 5000 шт.",
                value: item.lessThan5000Price,
                placeholder: "Введите цену до 5000шт...",
                style: { flex: " 0 1 15%" },
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
                name: "Описание",
                element: (
                  <input
                    type="text"
                    name="description"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.description}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Розница (рыночная цена)",
                element: (
                  <input
                    type="number"
                    name="retailMarketPrice"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.retailMarketPrice}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Розница",
                element: (
                  <input
                    type="number"
                    name="retailPrice"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.retailPrice}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "До 1500 шт.",
                element: (
                  <input
                    type="number"
                    name="lessThan1500Price"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.lessThan1500Price}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "До 5000 шт.",
                element: (
                  <input
                    type="number"
                    name="lessThan5000Price"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.lessThan5000Price}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Партнер",
                element: (
                  <input
                    type="number"
                    name="cost"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.partnerPrice}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Дилер",
                element: (
                  <input
                    type="number"
                    name="dealerPrice"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.dealerPrice}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Дистрибутор",
                element: (
                  <input
                    type="number"
                    name="distributorPrice"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.distributorPrice}
                    readOnly={props.readOnly}
                  />
                ),
              },
              {
                name: "Стопцена",
                element: (
                  <input
                    type="number"
                    name="stopPrice"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.stopPrice}
                    readOnly={props.readOnly}
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

export default SelectPriceItem;
