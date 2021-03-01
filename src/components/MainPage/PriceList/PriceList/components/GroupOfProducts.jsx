import React from "react";
import ChevronSVG from "../../../../../../assets/tableview/chevron-down.inline.svg";
import SelectPriceItem from "../../SelectPriceItem/SelectPriceItem.jsx";

const GroupOfProducts = ({ item, priceList, setPriceList, index }) => {
  const handleActivateGroup = (value) => {
    let originalList = priceList;
    originalList.splice(index, 1, {
      ...item,
      active: value,
    });
    setPriceList([...originalList]);
  };

  const handleMinimizeGroup = () => {
    let originalList = priceList;
    const isMinimized = priceList[index].isMinimized;
    originalList.splice(index, 1, {
      ...item,
      isMinimized: !isMinimized,
    });
    setPriceList([...originalList]);
  };

  const handleValuesChange = (value, name) => {
    let temp = priceList;
    temp.splice(index, 1, {
      ...item,
      [name]: value,
    });
    return setPriceList([...temp]);
  };

  return (
    <div className="price-list__group-wrapper">
      <div className="main-form__item">
        <CheckBox
          checked={item.active}
          name="groupOfProducts"
          onChange={handleActivateGroup}
          text={item.name}
        />
        <ChevronSVG
          className={`main-window__img`}
          style={{ transform: `rotate(${item.isMinimized ? 0 : 180}deg)` }}
          title={`${item.isMinimized ? "Раскрыть" : "Скрыть"} всю группу ${
            item.name
          }`}
          onClick={handleMinimizeGroup}
        />
      </div>
      <div
        className={
          item.isMinimized
            ? " main-form__item main-form__item--hidden"
            : item.active
            ? "main-form__item"
            : "main-form__item main-form__item--hidden"
        }
      >
        <div className="main-form__input_field">
          <SelectPriceItem
            handlePriceItemChange={(value) => {
              let temp = priceList;
              temp.splice(index, 1, {
                ...item,
                products: value,
              });
              setPriceList([...temp]);
            }}
            groupImg1={item.groupImg1}
            groupImg2={item.groupImg2}
            groupImg3={item.groupImg3}
            groupImg4={item.groupImg4}
            footerImg={item.footerImg}
            proprietaryItem={item.proprietaryItemText}
            handleLabelChange={handleValuesChange}
            handleImgChange={handleValuesChange}
            uniqueId={index}
            defaultValue={sortByField(item.products, {
              fieldName: "number",
              direction: "asc",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupOfProducts;
