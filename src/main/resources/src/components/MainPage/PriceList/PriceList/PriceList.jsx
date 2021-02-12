import React, { useState, useEffect } from "react";
import "./PriceList.scss";
import "../../../../utils/Form/Form.scss";
import SelectPriceItem from "../SelectPriceItem/SelectPriceItem.jsx";
import XLSX from "xlsx";
import {
  getPriceGroupImageByName,
  updatePriceGroupByName,
} from "../../../../utils/RequestsAPI/PriceList/PriceList.jsx";
import { getPriceListPdfText } from "../../../../utils/pdfFunctions.jsx";
import { exportPriceListToXLSX } from "../../../../utils/xlsxFunctions.jsx";
import categoryImg from "../../../../../../../../assets/priceList/default_category.png";
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
import { getPriceListPdfTextMini } from "./functions";
import ChevronSVG from "../../../../../../../../assets/tableview/chevron-down.inline.svg";
import { Link } from "react-router-dom";

const NewPriceList = () => {
  const [optionalCols, setOptionalCols] = useState(defaultOptionalColumns);
  const [categories, setCategories] = useState(defaultCategories);
  const [priceList, setPriceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllCategories, setSelectAllCategories] = useState(true);
  const [selectAllGroups, setSelectAllGroups] = useState(true);
  const [disclaimer, setDisclaimer] = useState("");
  const [titlePage, setTitlePage] = useState(defaultTitlePage);

  const isExistingCategory = (category) => {
    return categories.find((item) => item.name === category);
  };

  const loadImages = (data, titlePage1) => {
    setIsLoading(true);
    Promise.all(
      data.map((item, index) => {
        return getPriceGroupImageByName(item.number)
          .then((res) => res.json())
          .then((res) => {
            if (res.id !== null) {
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
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
    )
      .then(() => getPriceGroupImageByName("titlePage"))
      .then((res) => res.json())
      .then((res) => {
        setTitlePage({
          ...titlePage1,
          img1: res.imgOne,
          img2: res.imgTwo,
          img3: res.imgThree,
        });
        setIsLoading(false);
      });
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

  const parseExcelData = (result) => {
    let data = new Uint8Array(result);
    let wb = XLSX.read(data, { type: "array" });
    var firstSheetName = wb.SheetNames[0];
    let firstSheet = wb.Sheets[firstSheetName];
    var excelRows = XLSX.utils.sheet_to_json(firstSheet);
    // console.log(excelRows);
    if (excelRows.length === 0) {
      return alert("Файл пустой либо заполнен некорректно!");
    }
    setDisclaimer(excelRows[excelRows.length - 1].id);
    const titlePage1 = Object.assign({
      // ...titlePage,
      to: excelRows[0].titlePage,
      date: excelRows[1].titlePage,
      slogan: excelRows[2].titlePage,
      list: excelRows[3].titlePage.split("/"),
      active: true,
      isMinimized: true,
    });
    setTitlePage(titlePage1);
    let newData = [];
    let tempNumber = "000";
    let groupData = null;
    let startId = 0,
      endId = 0;
    for (let index = 3; index < excelRows.length; index++) {
      let item = excelRows[index];
      if (item.id === 1) {
        startId = index;
        endId = index;
        if (!isExistingCategory(item.category)) {
          let newCategories = categories;
          newCategories.push({
            groupImg1: categoryImg,
            name: item.category !== undefined ? item.category : "",
            active: true,
          });
        }
        groupData = Object.assign({
          id: item.id,
          groupImg1: "",
          groupImg2: "",
          groupImg3: "",
          groupImg4: "",
          footerImg: "",
          number: item.number,
          category: item.category,
          name: item.groupName,
          description: item.description,
          infoText: item.infoText,
          linkAddress: item.linkAddress,
          locationType: item.locationType,
          priceHeader: item.priceHeader,
          retailName: item.retailName,
          firstPriceName: item.firstPriceName,
          secondPriceName: item.secondPriceName,
          dealerName: item.dealerName,
          distributorName: item.distributorName,
          partnerName: item.partnerName,
          active: true,
          isMinimized: true,
          proprietaryItemText1: item.proprietaryItemText1,
          proprietaryItemText2: item.proprietaryItemText2,
        });
        tempNumber = item.number.substring(0, 3);
      } else {
        let products = [];
        for (let i = startId; i <= endId; i++) {
          products.push(
            Object.assign({
              id: excelRows[i].id,
              number: excelRows[i].number,
              name: excelRows[i].name,
              description: excelRows[i].productDescription,
              units: excelRows[i].units,
              lessThan1500Price: excelRows[i].firstPrice
                ? excelRows[i].firstPrice.toFixed(2)
                : 0,
              lessThan5000Price: excelRows[i].secondPrice
                ? excelRows[i].secondPrice.toFixed(2)
                : 0,
              cost: excelRows[i].cost ? excelRows[i].cost.toFixed(2) : 0,
              retailMarketPrice: excelRows[i].retailMarketPrice
                ? excelRows[i].retailMarketPrice.toFixed(2)
                : 0,
              retailPrice: excelRows[i].retailPrice
                ? excelRows[i].retailPrice.toFixed(2)
                : 0,
              firstPrice: excelRows[i].firstPrice
                ? excelRows[i].firstPrice.toFixed(2)
                : 0,
              secondPrice: excelRows[i].secondPrice
                ? excelRows[i].secondPrice.toFixed(2)
                : 0,
              partnerPrice: excelRows[i].partnerPrice
                ? excelRows[i].partnerPrice.toFixed(2)
                : 0,
              dealerPrice: excelRows[i].dealerPrice
                ? excelRows[i].dealerPrice.toFixed(2)
                : 0,
              distributorPrice: excelRows[i].distributorPrice
                ? excelRows[i].distributorPrice.toFixed(2)
                : 0,
              onSale: excelRows[i].onSale === "да" ? true : false,
            })
          );
        }
        if (item.number) {
          if (item.number.includes(tempNumber)) {
            endId++;
          } else {
            if (!isExistingCategory(item.category)) {
              let newCategories = categories;
              newCategories.push({
                groupImg1: categoryImg,
                name: item.category !== undefined ? item.category : "",
                active: true,
              });
            }

            newData.push({
              ...groupData,
              products,
            });
            groupData = Object.assign({
              id: item.id,
              groupImg1: "",
              groupImg2: "",
              groupImg3: "",
              groupImg4: "",
              footerImg: "",
              number: item.number,
              category: item.category,
              name: item.groupName,
              description: item.description,
              infoText: item.infoText,
              linkAddress: item.linkAddress,
              locationType: item.locationType,
              priceHeader: item.priceHeader,
              retailName: item.retailName,
              firstPriceName: item.firstPriceName,
              secondPriceName: item.secondPriceName,
              dealerName: item.dealerName,
              distributorName: item.distributorName,
              partnerName: item.partnerName,
              active: true,
              isMinimized: true,
              proprietaryItemText1: item.proprietaryItemText1,
              proprietaryItemText2: item.proprietaryItemText2,
            });
            startId = index;
            endId = index;
            tempNumber = item.number.substring(0, 3);
          }
        } else {
          newData.push({
            ...groupData,
            products,
          });
          break;
        }
      }
    }
    // console.log(newData)
    setPriceList(newData);
    return loadImages(newData, titlePage1);
  };

  useEffect(() => {
    document.title = "Прайс-лист";
  }, [priceList]);

  const sortPriceList = (priceList) => {
    return priceList.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  };

  const handleOpenPDF = () => {
    setIsLoading(true);
    getPriceListPdfText(
      categories,
      priceList.filter((item) => item.active),
      sortPriceList(optionalCols.filter((item) => item.active && item)),
      locationTypes,
      disclaimer,
      titlePage
    ).then(() => {
      setIsLoading(false);
    });
  };

  const handleOpenNewPDF = () => {
    setIsLoading(true);
    getPriceListPdfTextMini(
      categories,
      priceList.filter((item) => item.active),
      sortPriceList(optionalCols.filter((item) => item.active && item)),
      locationTypes
    ).then(() => {
      setIsLoading(false);
    });
  };

  const handleDownloadExcel = () => {
    setIsLoading(true);
    exportPriceListToXLSX(
      categories,
      priceList.filter((item) => item.active),
      sortPriceList(optionalCols.filter((item) => item.active && item))
    ).then(() => {
      setIsLoading(false);
    });
  };

  const sortCategories = (categories) => {
    return categories.sort((a, b) => {
      if (a.name.localeCompare(b.name, undefined, { numeric: true }) < 0) {
        return -1;
      }
      if (a.name.localeCompare(b.name, undefined, { numeric: true }) > 0) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <div className="new-price-item">
      <div className="main-form">
        <div className="main-window__header">
          <div className="main-form__title">
            Прайс-лист{" "}
            <Link className="main-window__button" to="/ltd-list">
              Список ООО
            </Link>
          </div>
        </div>
        <form className="main-form__form">
          <div className="main-form__item">
            <div className="main-form__input_name">
              Excel-таблица для парсинга
            </div>
            <FileUploader
              regex={/.+\.(xlsx|csv)/}
              uniqueId="excel-reader"
              type="readAsArrayBuffer"
              onChange={(result) => {
                parseExcelData(result);
              }}
            />
          </div>
          {priceList.length > 0 && (
            <div className="main-form__buttons main-form__buttons--full">
              <Button
                text="Открыть .pdf"
                isLoading={isLoading}
                className="main-form__submit main-form__submit--inverted"
                inverted
                onClick={handleOpenPDF}
              />
              <Button
                text="Новый прайс"
                isLoading={isLoading}
                className="main-form__submit main-form__submit--inverted"
                inverted
                onClick={handleOpenNewPDF}
              />
              <Button
                text="Скачать .xlsx"
                isLoading={isLoading}
                className="main-form__submit main-form__submit--inverted"
                inverted
                onClick={handleDownloadExcel}
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
                <CheckBox
                  text="Выделить все категории"
                  checked={selectAllCategories}
                  name="header"
                  onChange={(value) => {
                    setSelectAllCategories(value);
                    let originalList = categories.map((item) => {
                      return {
                        ...item,
                        active: value,
                      };
                    });
                    setCategories([...originalList]);
                  }}
                />
                <CheckBox
                  text="Выделить все группы товаров"
                  checked={selectAllGroups}
                  name="header"
                  onChange={(value) => {
                    setSelectAllGroups(value);
                    let originalList = priceList.map((item) => {
                      return {
                        ...item,
                        active: value,
                      };
                    });
                    setPriceList([...originalList]);
                  }}
                />
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

export default NewPriceList;

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
            handleLabelChange={(value, name) => {
              let temp = priceList;
              temp.splice(index, 1, {
                ...item,
                [name]: value,
              });
              setPriceList([...temp]);
            }}
            handleImgChange={(newImg, name) => {
              let temp = priceList;
              temp.splice(index, 1, {
                ...item,
                [name]: newImg,
              });
              setPriceList([...temp]);
            }}
            uniqueId={index}
            defaultValue={item.products.sort((a, b) => {
              if (priceList.length <= 1) return 0;
              else {
                if (
                  a.number.localeCompare(b.number, undefined, {
                    numeric: true,
                  }) < 0
                ) {
                  return -1;
                }
                if (
                  a.number.localeCompare(b.number, undefined, {
                    numeric: true,
                  }) > 0
                ) {
                  return 1;
                }
                return 0;
              }
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
            let temp = categories;
            temp.splice(categoryIndex, 1, {
              ...category,
              img: result,
            });
            setCategories([...temp]);
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
            <div className="main-form__item">
              <div className="main-form__input_name">Фотография 1</div>
              <div className="main-form__input_field">
                <FileUploader
                  uniqueId={"fileTitlePage" + 1}
                  onChange={async (result) => {
                    const downgraded =
                      result !== ""
                        ? await getDataUri(result, "jpeg", 0.3)
                        : "";
                    setTitlePage({
                      ...titlePage,
                      img1: downgraded,
                    });
                  }}
                  previewImage={titlePage.img1 !== "" ? titlePage.img1 : null}
                />
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Фотография 2</div>
              <div className="main-form__input_field">
                <FileUploader
                  uniqueId={"fileTitlePage" + 2}
                  onChange={async (result) => {
                    const downgraded =
                      result !== ""
                        ? await getDataUri(result, "jpeg", 0.3)
                        : "";
                    setTitlePage({
                      ...titlePage,
                      img2: downgraded,
                    });
                  }}
                  previewImage={titlePage.img2 !== "" ? titlePage.img2 : null}
                />
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Фотография 3</div>
              <div className="main-form__input_field">
                <FileUploader
                  uniqueId={"fileTitlePage" + 3}
                  onChange={async (result) => {
                    const downgraded =
                      result !== ""
                        ? await getDataUri(result, "jpeg", 0.3)
                        : "";
                    setTitlePage({
                      ...titlePage,
                      img3: downgraded,
                    });
                  }}
                  previewImage={titlePage.img3 !== "" ? titlePage.img3 : null}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
