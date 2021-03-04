import { useState, useEffect } from 'react';
import './PriceList.scss';
import 'Utils/Form/Form.scss';
import {
  getPriceGroupImageByName,
  updatePriceGroupByName,
} from 'Utils/RequestsAPI/PriceList/PriceList.jsx';
import FileUploader from 'Utils/Form/FileUploader/FileUploader.jsx';
import CheckBox from 'Utils/Form/CheckBox/CheckBox.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import {
  defaultCategories,
  defaultOptionalColumns,
  locationTypes,
  defaultTitlePage,
} from './objects.js';
import { getPriceListPdf } from './getPriceListPdf.js';
import { getPriceListExcel } from './getPriceListExcel.js';
import { Link } from 'react-router-dom';
import SelectLtd from '../LtdListPage/SelectLtd/SelectLtd.jsx';
import { sortByField } from 'Utils/sorting/sorting';
import { parseExcelData } from './functions.js';
import GroupTitlePage from './components/GroupTitlePage.jsx';
import CategoryHeader from './components/CategoryHeader.jsx';
import GroupOfProducts from './components/GroupOfProducts.jsx';

const PriceList = () => {
  const [optionalCols, setOptionalCols] = useState(defaultOptionalColumns);
  const [categories, setCategories] = useState(defaultCategories);
  const [priceList, setPriceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllCategories, setSelectAllCategories] = useState(true);
  const [selectAllGroups, setSelectAllGroups] = useState(true);
  const [disclaimer, setDisclaimer] = useState('');
  const [titlePage, setTitlePage] = useState(defaultTitlePage);
  const [selectedLtd, setSelectedLtd] = useState(null);

  const loadTitlePageImages = (_titlePage) => {
    setIsLoading(true);
    return getPriceGroupImageByName('titlePage')
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
      }),
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
        }),
      ),
    )
      .then(() =>
        updatePriceGroupByName('titlePage', {
          name: 'titlePage',
          imgOne: titlePage.img1,
          imgTwo: titlePage.img2,
          imgThree: titlePage.img3,
        }),
      )
      .then(() => {
        setIsLoading(false);
        alert('Данные были успешно сохранены!');
      });
  };

  useEffect(() => {
    document.title = 'Прайс-лист';
  }, [priceList]);

  const sortPriceList = (priceList) => {
    return sortByField(priceList, { fieldName: 'id', direction: 'asc' });
  };

  const handleOpenPDF = (newPDF = false) => {
    setIsLoading(true);
    getPriceListPdf(
      categories,
      priceList.filter((item) => item.active),
      {
        optionalCols: sortPriceList(
          optionalCols.filter((item) => item.active && item),
        ),
        locationTypes: locationTypes,
        disclaimer: disclaimer,
        titlePage: titlePage,
        companyContacts: selectedLtd,
        isMini: newPDF,
      },
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
          optionalCols.filter((item) => item.active && item),
        ),
        isMini: newXLSX,
      },
    ).then(() => {
      setIsLoading(false);
    });
  };

  const sortCategories = (categories) => {
    return sortByField(categories, {
      fieldName: 'name',
      direction: 'asc',
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
                  result,
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
                {getSelectAllCheckbox('Выделить все категории', {
                  checked: selectAllCategories,
                  setAll: (value) => setSelectAllCategories(value),
                  list: categories,
                  setList: (value) => setCategories(value),
                })}
                {getSelectAllCheckbox('Выделить все группы товаров', {
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
                          ? 'main-form__button'
                          : 'main-form__button main-form__button--inverted'
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
                          <GroupOfProducts
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
