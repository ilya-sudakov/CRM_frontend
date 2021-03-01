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
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false);
  const [groupImg1, setGroupImg1] = useState(null);
  const [groupImg2, setGroupImg2] = useState(null);
  const [groupImg3, setGroupImg3] = useState(null);
  const [groupImg4, setGroupImg4] = useState(null);
  const [footerImg, setFooterImg] = useState(null);

  useEffect(() => {
    if (props.defaultValue !== undefined && !defaultValueLoaded) {
      setSelected([
        ...props.defaultValue.map((item) => {
          return Object.assign({ ...item, isMinimized: true });
        }),
      ]);
      setDefaultValueLoaded(true);
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

  const handleInputChange = (index, name, value) => {
    let temp = selected;
    let originalItem = selected[index];
    temp.splice(id, 1, {
      ...originalItem,
      [name]: value,
    });
    setSelected([...temp]);
    props.handlePriceItemChange([...temp]);
  };

  const getInputElement = (type = "text", name, index) => {
    return (
      <input
        type={type}
        name={name}
        index={index}
        autoComplete="off"
        onChange={({ target }) => handleInputChange(index, name, target.value)}
        defaultValue={item[name]}
        readOnly={props.readOnly}
      />
    );
  };

  const onImageDataChange = async (result, imgInfo) => {
    const downgraded =
      result !== "" ? await getDataUri(result, "jpeg", 0.3) : "";
    imgInfo.setter(downgraded);
    props.handleImgChange(downgraded, imgInfo.itemName);
  };

  const getPhotoInputElement = (title, index, imgInfo) => {
    return (
      <div className="main-form__item">
        <div className="main-form__input_name">{title}</div>
        <div className="main-form__input_field">
          {!props.readOnly && (
            <FileUploader
              uniqueId={`file${index}${props.uniqueId}`}
              onChange={(result) => onImageDataChange(result, imgInfo)}
              previewImage={imgInfo.previewImage}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="select-price-item">
      <div className="select-price-item__selected">
        {!props.readOnly && (
          <div className="price-list__images-wrapper">
            {getPhotoInputElement("Фотография 1", 1, {
              setter: (downgraded) => setGroupImg1(downgraded),
              itemName: "groupImg1",
              previewImage: groupImg1,
            })}
            {getPhotoInputElement("Фотография 2", 2, {
              setter: (downgraded) => setGroupImg2(downgraded),
              itemName: "groupImg2",
              previewImage: groupImg2,
            })}
            {getPhotoInputElement("Фотография 3", 3, {
              setter: (downgraded) => setGroupImg3(downgraded),
              itemName: "groupImg3",
              previewImage: groupImg3,
            })}
            {getPhotoInputElement("Фотография 4", 4, {
              setter: (downgraded) => setGroupImg4(downgraded),
              itemName: "groupImg4",
              previewImage: groupImg4,
            })}
            {getPhotoInputElement("Фотография снизу", 5, {
              setter: (downgraded) => setFooterImg(downgraded),
              itemName: "footerImg",
              previewImage: footerImg,
            })}
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
                element: getInputElement("text", "name", index),
              },
              {
                name: "Артикул",
                element: getInputElement("text", "number", index),
              },
              {
                name: "Описание",
                element: getInputElement("text", "description", index),
              },
              {
                name: "Розница (рыночная цена)",
                element: getInputElement("number", "retailMarketPrice", index),
              },
              {
                name: "Розница",
                element: getInputElement("number", "retailPrice", index),
              },
              {
                name: "До 1500 шт.",
                element: getInputElement("number", "lessThan1500Price", index),
              },
              {
                name: "До 5000 шт.",
                element: getInputElement("number", "lessThan5000Price", index),
              },
              {
                name: "Партнер",
                element: getInputElement("number", "cost", index),
              },
              {
                name: "Дилер",
                element: getInputElement("number", "dealerPrice", index),
              },
              {
                name: "Дистрибутор",
                element: getInputElement("number", "distributorPrice", index),
              },
              {
                name: "Стопцена",
                element: getInputElement("number", "stopPrice", index),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectPriceItem;
