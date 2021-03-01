import React, { useState, useEffect } from "react";
import "./PriceList.scss";
import "../../../../utils/Form/Form.scss";
import SelectPriceItem from "../SelectPriceItem/SelectPriceItem.jsx";
import {
  getPriceGroupImageByName,
  updatePriceGroupByName,
} from "../../../../utils/RequestsAPI/PriceList/PriceList.jsx";
import InputText from "../../../../utils/Form/InputText/InputText.jsx";
import FileUploader from "../../../../utils/Form/FileUploader/FileUploader.jsx";
import CheckBox from "../../../../utils/Form/CheckBox/CheckBox.jsx";
import { getDataUri } from "../../../../utils/functions.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import {
  defaultCategories,
  defaultOptionalColumns,
  locationTypes,
  defaultTitlePage,
} from "./objects.js";
import { getPriceListPdf } from "./getPriceListPdf.js";
import { getPriceListExcel } from "./getPriceListExcel.js";
import ChevronSVG from "../../../../../../../../assets/tableview/chevron-down.inline.svg";
import { Link } from "react-router-dom";
import SelectLtd from "../LtdListPage/SelectLtd/SelectLtd.jsx";
import { sortByField } from "../../../../utils/sorting/sorting";
import { parseExcelData } from "./functions.js";

const PriceList = () => {
  const [optionalCols, setOptionalCols] = useState(defaultOptionalColumns);
  const [categories, setCategories] = useState(defaultCategories);
  const [priceList, setPriceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllCategories, setSelectAllCategories] = useState(true);
  const [selectAllGroups, setSelectAllGroups] = useState(true);
  const [disclaimer, setDisclaimer] = useState("");
  const [titlePage, setTitlePage] = useState(defaultTitlePage);
  const [selectedLtd, setSelectedLtd] = useState(null);

  const loadTitlePageImages = (_titlePage) => {
    setIsLoading(true);
    return getPriceGroupImageByName("titlePage")
      .then((res) => res.json())
      .then((res) => {
        setTitlePage({
          ..._titlePage,
          img1: res.imgOne,
          img2: res.imgTwo,
          img3: res.imgThree,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadImages = (data, _titlePage) => {
    setIsLoading(true);
    return Promise.all(
      data.map((item, index) => {
        return getPriceGroupImageByName(item.number)
          .then((res) => res.json())
          .then((res) => {
            if (res.id === null) return;
            let temp = data;
            temp.splice(index, 1, {
              ...temp[index],
              groupImg1: res.imgOne,
              groupImg2: res.imgTwo,
              groupImg3: res.imgThree,
              groupImg4: res.imgFour,
              footerImg: res.imgFive,
            });
            setPriceList(temp);
          })
          .catch((error) => {
            console.log(error);
          });
      })
    ).then(() => loadTitlePageImages(_titlePage));
  };

  const saveImages = () => {
    setIsLoading(true);
    Promise.all(
      priceList.map((item) =>
        updatePriceGroupByName(item.number, {
          name: item.number,
          imgOne: item.groupImg1,
          imgTwo: item.groupImg2,
          imgThree: item.groupImg3,
          imgFour: item.groupImg4,
          imgFive: item.footerImg,
        })
      )
    )
      .then(() =>
        updatePriceGroupByName("titlePage", {
          name: "titlePage",
          imgOne: titlePage.img1,
          imgTwo: titlePage.img2,
          imgThree: titlePage.img3,
        })
      )
      .then(() => {
        setIsLoading(false);
        alert("Данные были успешно сохранены!");
      });
  };

  useEffect(() => {
    document.title = "Прайс-лист";
  }, [priceList]);

  const sortPriceList = (priceList) => {
    return sortByField(priceList, { fieldName: "id", direction: "asc" });
  };

  const handleOpenPDF = (newPDF = false) => {
    setIsLoading(true);
    getPriceListPdf(
      categories,
      priceList.filter((item) => item.active),
      {
        optionalCols: sortPriceList(
          optionalCols.filter((item) => item.active && item)
        ),
        locationTypes: locationTypes,
        disclaimer: disclaimer,
        titlePage: titlePage,
        companyContacts: selectedLtd,
        isMini: newPDF,
      }
    ).then(() => {
      setIsLoading(false);
    });
  };

  const handleDownloadExcel = (newXLSX = false) => {
    setIsLoading(true);
    getPriceListExcel(
      categories,
      priceList.filter((item) => item.active),
      {
        optionalCols: sortPriceList(
          optionalCols.filter((item) => item.active && item)
        ),
        isMini: newXLSX,
      }
    ).then(() => {
      setIsLoading(false);
    });
  };

  const sortCategories = (categories) => {
    return sortByField(categories, {
      fieldName: "name",
      direction: "asc",
    });
  };

  const getSelectAllCheckbox = (text, item) => {
    return (
      <CheckBox
        text={text}
        checked={item.checked}
        name="header"
        onChange={(value) => {
          item.setAll(value);
          let originalList = item.list.map((item) => ({
            ...item,
            active: value,
          }));
          item.setList([...originalList]);
        }}
      />
    );
  };

  return (
    <div className="new-price-item">
      <div className="main-form">
        <div className="main-window__header">
          <div className="main-form__title">
            Прайс-лист
            <Link className="main-window__button" to="/ltd-list">
              Список ООО
            </Link>
          </div>
        </div>
        <form className="main-form__form">
          <SelectLtd onChange={(item) => setSelectedLtd(item)} />
          <div className="main-form__item">
            <div className="main-form__input_name">
              Excel-таблица для парсинга
            </div>
            <FileUploader
              regex={/.+\.(xlsx|csv)/}
              uniqueId="excel-reader"
              type="readAsArrayBuffer"
              onChange={(result) => {
                const { parsedData, disclaimer, titlePage } = parseExcelData(
                  result
                );
                setDisclaimer(disclaimer);
                setTitlePage(titlePage);
                setPriceList(parsedData);
                loadImages(parsedData, titlePage);
              }}
            />
          </div>
          {priceList.length > 0 && (
            <div className="main-form__buttons main-form__buttons--full">
              <Button
                text="Полный .pdf"
                isLoading={isLoading}
                className="main-form__submit main-form__submit--inverted"
                inverted
                onClick={() => handleOpenPDF(false)}
              />
              <Button
                text="Краткий .pdf"
                isLoading={isLoading}
                className="main-form__submit main-form__submit--inverted"
                inverted
                onClick={() => handleOpenPDF(true)}
              />
              <Button
                text="Полный .xlsx"
                isLoading={isLoading}
                className="main-form__submit main-form__submit--inverted"
                inverted
                onClick={() => handleDownloadExcel(false)}
              />
              <Button
                text="Краткий .xlsx"
                isLoading={isLoading}
                className="main-form__submit main-form__submit--inverted"
                inverted
                onClick={() => handleDownloadExcel(true)}
              />
              <Button
                text="Сохранить данные"
                isLoading={isLoading}
                className="main-form__submit"
                onClick={saveImages}
              />
            </div>
          )}
          {priceList.length > 0 && (
            <div className="main-form__buttons main-form__buttons--full">
              <div className="new-price-item__checkbox-container">
                {getSelectAllCheckbox("Выделить все категории", {
                  checked: selectAllCategories,
                  setAll: (value) => setSelectAllCategories(value),
                  list: categories,
                  setList: (value) => setCategories(value),
                })}
                {getSelectAllCheckbox("Выделить все группы товаров", {
                  checked: selectAllGroups,
                  setAll: (value) => setSelectAllGroups(value),
                  list: priceList,
                  setList: (value) => setPriceList(value),
                })}
              </div>
              <div className="main-form__info-panel">
                <span>Дополнительные столбцы: </span>
                {optionalCols.map((item, index) => {
                  return (
                    <div
                      className={
                        item.active
                          ? "main-form__button"
                          : "main-form__button main-form__button--inverted"
                      }
                      onClick={() => {
                        let temp = optionalCols;
                        temp.splice(index, 1, {
                          ...item,
                          active: !item.active,
                        });
                        setOptionalCols([...temp]);
                      }}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {priceList.length > 0 && (
            <div className="main-form__buttons main-form__buttons--vertical">
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Каталог продукции</div>
                <GroupTitlePage
                  titlePage={titlePage}
                  setTitlePage={setTitlePage}
                />
              </div>
            </div>
          )}
          {sortCategories(categories).map((category, categoryIndex) => {
            if (
              priceList.reduce((prev, cur) => {
                if (cur.category === category.name) {
                  return prev + 1;
                } else {
                  return prev;
                }
              }, 0) > 0
            ) {
              return (
                <div className="price-list__category-wrapper">
                  <CategoryHeader
                    category={category}
                    setCategories={setCategories}
                    categories={categories}
                    categoryIndex={categoryIndex}
                  />
                  {category.active &&
                    sortPriceList(priceList).map((item, index) => {
                      if (item.category === category.name) {
                        return (
                          <GroupProducts
                            item={item}
                            priceList={priceList}
                            setPriceList={setPriceList}
                            index={index}
                          />
                        );
                      }
                    })}
                </div>
              );
            }
          })}
        </form>
      </div>
    </div>
  );
};

export default PriceList;

const GroupProducts = ({ item, priceList, setPriceList, index }) => {
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

const CategoryHeader = ({
  category,
  setCategories,
  categories,
  categoryIndex,
}) => {
  return (
    <div className="main-form__item main-form__item--header">
      <CheckBox
        checked={category.active}
        name="category"
        onChange={(value) => {
          let originalList = categories;
          originalList.splice(categoryIndex, 1, {
            ...category,
            active: value,
          });
          setCategories([...originalList]);
        }}
        text={category.name}
      />
      <div className="main-form__input_field">
        <FileUploader
          uniqueId={"categoryImg" + categoryIndex}
          onChange={(result) => {
            let originalList = categories;
            originalList.splice(categoryIndex, 1, {
              ...category,
              img: result,
            });
            setCategories([...originalList]);
          }}
          previewImage={category.img}
        />
      </div>
    </div>
  );
};

const GroupTitlePage = ({ titlePage, setTitlePage }) => {
  const handleActivateTitlePageGroup = (value) => {
    return setTitlePage({
      ...titlePage,
      active: value,
    });
  };

  const handleMinimizeTitlePageGroup = () => {
    return setTitlePage({
      ...titlePage,
      isMinimized: !titlePage.isMinimized,
    });
  };

  const getTitlePagePhotoInputElement = (title, index, name) => {
    return (
      <div className="main-form__item">
        <div className="main-form__input_name">{title}</div>
        <div className="main-form__input_field">
          <FileUploader
            uniqueId={`fileTitlePage${index}`}
            onChange={async (result) => {
              const downgraded =
                result !== "" ? await getDataUri(result, "jpeg", 0.3) : "";
              setTitlePage({
                ...titlePage,
                [name]: downgraded,
              });
            }}
            previewImage={titlePage[name] !== "" ? titlePage[name] : null}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="main-form__item main-form__item--header">
        <CheckBox
          checked={titlePage.active}
          name="titleList"
          onChange={handleActivateTitlePageGroup}
          text="Титульная страница"
        />
        <ChevronSVG
          className={`main-window__img`}
          style={{ transform: `rotate(${titlePage.isMinimized ? 0 : 180}deg)` }}
          title={`${
            titlePage.isMinimized ? "Раскрыть" : "Скрыть"
          } Титульный лист`}
          onClick={handleMinimizeTitlePageGroup}
        />
      </div>
      {!titlePage.isMinimized && titlePage.active ? (
        <div className="price-list__title-page-wrapper">
          <InputText
            inputName="Получатель"
            name="to"
            defaultValue={titlePage.to}
            handleInputChange={(event) => {
              setTitlePage({
                ...titlePage,
                to: event.target.value,
              });
            }}
          />
          <div className="price-list__images-wrapper">
            {getTitlePagePhotoInputElement("Фотография 1", 1, "img1")}
            {getTitlePagePhotoInputElement("Фотография 2", 2, "img2")}
            {getTitlePagePhotoInputElement("Фотография 3", 3, "img3")}
          </div>
        </div>
      ) : null}
    </>
  );
};
