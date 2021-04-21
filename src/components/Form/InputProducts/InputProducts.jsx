import './InputProducts.scss';
import SelectFromButton from '../SelectFromButton/SelectFromButton.jsx';
import { useState, useEffect, useCallback } from 'react';
import './Select.scss';
import SearchBar from 'Components/MainPage/SearchBar/SearchBar.jsx';
import TableView from 'Components/MainPage/Products/TableView.jsx';
import FormWindow from 'Components/Form/FormWindow/FormWindow.jsx';
import ImgLoader from 'Utils/TableView/ImgLoader/ImgLoader.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import { useSort, useProductsList } from 'Utils/hooks';
import {
  renderNewQuantity,
  renderPackaging,
  renderQuantity,
  renderSelectedItemName,
  renderSelectPackaging,
} from './functions.jsx';

const InputProducts = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryCategory, setSearchQueryCategory] = useState('');
  const [selected, setSelected] = useState([]);
  const { products, categories } = useProductsList(
    !props.products || !props.categories,
  );
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { sortPanel, sortedData } = useSort(
    props.products ?? products,
    {
      ignoreURL: true,
      sortOrder: {
        curSort: 'name',
        name: 'asc',
      },
      sortOptions: [
        { value: 'name asc', text: 'По алфавиту (А-Я)' },
        { value: 'name desc', text: 'По алфавиту (Я-А)' },
        { value: 'weight desc', text: 'По весу' },
      ],
    },
    [props.products ?? products],
  );

  const search = () => {
    let searchArr = searchQuery.split(' ');
    return (props.products ?? products).filter((item) => {
      let check = true;
      searchArr.map((searchWord) => {
        if (
          item.name.toLowerCase().includes(searchWord.toLowerCase()) === false
        )
          check = false;
      });
      if (check === true) {
        return true;
      } else {
        return false;
      }
    });
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clickOnInput = () => {
    setShowOverlay(!showOverlay);
    return setShowOptions(!showOptions);
  };

  const clickOverlay = () => {
    if (showOverlay) {
      clickOnInput();
    }
  };

  const clickOnOption = (event) => {
    const value = event.currentTarget.getAttribute('name');
    const id = event.currentTarget.getAttribute('id');
    const productId = event.currentTarget.getAttribute('productId');
    const newData = {
      id: id,
      name: value,
      quantity: 0,
      quantityNew: 0,
      packaging: '',
      status: 'production',
      productId: productId,
    };
    clickOnInput();
    setSelected([...selected, newData]);
    props.onChange([...selected, newData]);
  };

  const selectProduct = (id, value, productId) => {
    const newData = {
      id: id,
      name: value,
      quantity: 0,
      quantityNew: 0,
      packaging: '',
      status: 'production',
      productId: productId,
    };
    setSelected([...selected, newData]);
    props.onChange([...selected, newData]);
  };

  const clickOnSelected = (event) => {
    const id = event.target.getAttribute('id');
    let newSelected = selected;
    newSelected.splice(id, 1);
    setSelected([...newSelected]);
    props.onChange([...newSelected]);
  };

  const handleParamChange = (event) => {
    const value = event.target.value;
    const name = event.target.getAttribute('name');
    const id = event.target.getAttribute(name + '_id');
    const productId = event.target.getAttribute(productId);
    let newSelected = selected;
    newSelected = newSelected.map((item, index) => {
      return {
        ...item,
        [name]: index == id ? value : item[name],
      };
    });
    setSelected([...newSelected]);
    props.onChange([...newSelected]);
  };

  const handleStatusChange = (color, id) => {
    let newSelected = selected;
    newSelected = newSelected.map((item) => {
      return {
        ...item,
        status: item.id == id ? color : item.status,
      };
    });
    setSelected([...newSelected]);
    props.onChange([...newSelected]);
  };

  const pressEscKey = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        console.log(showOptions, showOverlay);

        if (showOptions) {
          return clickOnInput();
        }
      }
    },
    [showOptions, showOverlay],
  );

  const filterSearchQuery = (data) => {
    const query = searchQueryCategory.toLowerCase();
    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toString().includes(query) ||
        item.weight.toString().includes(query) ||
        (item.comment !== null && item.comment.toLowerCase().includes(query))
      );
    });
  };

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setSelected([...props.defaultValue]);
    }
    document.addEventListener('keydown', pressEscKey, false);
    return () => {
      document.removeEventListener('keydown', pressEscKey, false);
    };
  }, [props.defaultValue, props.categories, showOptions, showOverlay]);

  // LAYOUT OPTIONS, RENDER FUNCTIONS

  const defaultPropsForLayoutFunctions = {
    numberInput: props.numberInput,
    readOnly: props.readOnly,
    workshop: props.workshop,
    handleParamChange: (event) => handleParamChange(event),
    clickOnSelected: clickOnSelected,
    handleStatusChange: handleStatusChange,
  };

  const customLayoutOptions = {
    productName: {
      render: (index, item, options) =>
        renderSelectedItemName(
          index,
          item,
          defaultPropsForLayoutFunctions,
          options,
        ),
    },
    quantity: {
      render: (index, item, options) =>
        renderQuantity(index, item, defaultPropsForLayoutFunctions, options),
    },
    newQuantity: {
      render: (index, item, options) =>
        renderNewQuantity(index, item, defaultPropsForLayoutFunctions, options),
    },
    packaging: {
      render: (index, item, options) =>
        renderPackaging(index, item, defaultPropsForLayoutFunctions, options),
    },
    selectPackaging: {
      render: (index, item) =>
        renderSelectPackaging(
          index,
          item,
          defaultPropsForLayoutFunctions,
          props.products ?? products,
        ),
    },
  };

  return (
    <div className="input_products">
      <div className="input_products__input">
        <div className="input_products__input_name main-form__input_name--header">
          {props.inputName + (props.required ? '*' : '')}
          {!props.readOnly && (
            <SelectFromButton
              text="Выбрать продукцию"
              onClick={() => setShowWindow(!showWindow)}
            />
          )}
        </div>
        <div className="select">
          <div
            className={
              showOverlay
                ? 'select__overlay'
                : 'select__overlay select__overlay--hidden'
            }
            onClick={clickOverlay}
          ></div>
          {!props.readOnly &&
            !props.workshop &&
            props.customSearch?.display !== false && (
              <div className="select__searchbar">
                <input
                  type="text"
                  className={
                    props.error === true
                      ? 'select__input select__input--error'
                      : 'select__input'
                  }
                  onChange={handleInputChange}
                  onClick={!props.readOnly ? clickOnInput : null}
                  placeholder={props.searchPlaceholder}
                  readOnly={props.readOnly || props.workshop}
                />
                <FormWindow
                  title="Выбор продукции"
                  content={
                    <>
                      <SearchBar
                        fullSize
                        placeholder="Введите название продукции для поиска..."
                        setSearchQuery={setSearchQueryCategory}
                      />
                      <ControlPanel
                        itemsCount={`Всего: ${
                          (props.products ?? products).length
                        } записей`}
                        sorting={sortPanel}
                      />
                      <TableView
                        products={filterSearchQuery(sortedData)}
                        categories={props.categories ?? categories}
                        searchQuery={searchQueryCategory}
                        deleteItem={null}
                        selectProduct={selectProduct}
                        closeWindow={closeWindow}
                        setCloseWindow={setCloseWindow}
                        setShowWindow={setShowWindow}
                      />
                    </>
                  }
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                />
              </div>
            )}
          {props.error === true && (
            <div
              className="select__error"
              onClick={
                props.setErrorsArr
                  ? () =>
                      props.setErrorsArr({
                        ...props.errorsArr,
                        [props.name]: false,
                      })
                  : null
              }
            >
              Поле не заполнено!
            </div>
          )}
          {props.options && (
            <div
              className={
                showOptions
                  ? 'select__options'
                  : 'select__options select__options--hidden'
              }
            >
              {search().map((item, index) => (
                <div
                  key={item.id}
                  id={item.id}
                  optionId={index}
                  productId={item.id}
                  name={item.name}
                  className="select__option_item"
                  onClick={clickOnOption}
                >
                  <ImgLoader imgSrc={item.photo} imgClass="select__img" />
                  <div>{'№' + item.id + ', ' + item.name}</div>
                </div>
              ))}
            </div>
          )}
          <div className="select__selected">
            {selected.length !== 0 && (
              <span className="select__selected_title">
                Выбранная продукция:
              </span>
            )}
            {selected.map((item, index) => (
              <div
                key={item.id}
                className={
                  !props.readOnly &&
                  !props.workshop &&
                  props.customSelectedItem?.isMinimized !== true
                    ? 'select__selected_row'
                    : 'select__selected_row select__selected_row--minimized'
                }
              >
                {props.customLayout ? (
                  <>
                    {Object.entries(props.customLayout).map((layoutOption) => {
                      return customLayoutOptions[layoutOption[0]].render(
                        index,
                        item,
                        layoutOption[1],
                      );
                    })}
                  </>
                ) : (
                  <>
                    {renderSelectedItemName(
                      index,
                      item,
                      defaultPropsForLayoutFunctions,
                    )}
                    {renderQuantity(
                      index,
                      item,
                      defaultPropsForLayoutFunctions,
                    )}
                    {renderPackaging(
                      index,
                      item,
                      defaultPropsForLayoutFunctions,
                      props.noPackaging
                        ? {
                            readOnly: true,
                            customName: `Фасовка${!props.readOnly ? '*' : ''}`,
                            marginRight: '0px',
                          }
                        : undefined,
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputProducts;
