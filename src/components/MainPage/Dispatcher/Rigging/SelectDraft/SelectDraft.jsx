import { useState, useEffect, useCallback } from 'react';
import deleteSVG from 'Assets/select/delete.svg';
import './SelectDraft.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';
import SelectFromButton from 'Utils/Form/SelectFromButton/SelectFromButton.jsx';
import { getStamp } from 'Utils/RequestsAPI/Rigging/Stamp.jsx';

const SelectDraft = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryCategory, setSearchQueryCategory] = useState('');
  const [selected, setSelected] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false);

  const search = () => {
    let re = /[.,\s\-_]/gi;
    const query = searchQuery.toLowerCase();
    let searchArr = query.split(' ');
    return (props.drafts ? props.drafts : drafts).filter((item) => {
      let check = true;
      searchArr.map((searchWord) => {
        if (
          item.name.toLowerCase().includes(searchWord.toLowerCase()) ===
            false &&
          item.number
            .toLowerCase()
            .replace(re, '')
            .includes(query.replace(re, '')) === false
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

  async function loadDrafts() {
    if (props.drafts) {
      setDrafts([...props.drafts]);
    } else {
      let newDrafts = [];
      getStamp()
        .then((res) => res.json())
        .then((res) => {
          res.map((item) => {
            return item.stampParts.map((stamp) => {
              return newDrafts.push({
                ...stamp,
                value: stamp.id,
                label: `${stamp.number}, ${stamp.name}`,
                type: 'Stamp',
              });
            });
          });
          return setDrafts([...newDrafts]);
        });
    }
  }

  const clickOnOption = (event) => {
    const value = event.currentTarget.getAttribute('name');
    const id = event.currentTarget.getAttribute('id');
    const type = event.currentTarget.getAttribute('type');
    const number = event.currentTarget.getAttribute('number');
    setShowOptions(!showOptions);
    const newDraft = {
      partId: id,
      name: value,
      number: number,
      type: type,
      quantity: 0,
    };
    setSelected([...selected, newDraft]);
    props.onChange([...selected, newDraft]);
  };

  const selectDraft = (id, value, type, number) => {
    const newDraft = {
      partId: id,
      type: type,
      name: value,
      number: number,
      quantity: 0,
    };
    setSelected([...selected, newDraft]);
    props.onChange([...selected, newDraft]);
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

  const pressEscKey = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowOptions(!showOptions);
    }
  }, []);

  useEffect(() => {
    if (props.defaultValue !== undefined && !defaultValueLoaded) {
      setSelected([...props.defaultValue]);
      setDefaultValueLoaded(true);
    }
    document.addEventListener('keydown', pressEscKey, false);
    drafts.length === 0 && loadDrafts();
    // loadDrafts();
    return () => {
      document.removeEventListener('keydown', pressEscKey, false);
    };
  }, [props.defaultValue, props.categories, showOptions]);

  return (
    <div className="select-draft">
      <div className="select-draft__input_name main-form__input_name--header">
        Чертежи
        {!props.readOnly && (
          <SelectFromButton
            text="Выбрать чертеж"
            onClick={() => setShowWindow(!showWindow)}
          />
        )}
      </div>
      <div
        className={
          showOptions
            ? 'select-draft__overlay'
            : 'select-draft__overlay select-draft__overlay--hidden'
        }
        onClick={() => setShowOptions(!showOptions)}
      ></div>
      {!props.readOnly && !props.workshop && (
        <div className="select-draft__searchbar">
          <input
            type="text"
            className={
              props.error === true
                ? 'select-draft__input select-draft__input--error'
                : 'select-draft__input'
            }
            onChange={handleInputChange}
            onClick={() => {
              !props.readOnly && setShowOptions(!showOptions);
            }}
            placeholder={'Введите артикул чертежа для поиска...'}
            readOnly={props.readOnly || props.workshop}
          />
          <FormWindow
            title="Выбор чертежа"
            content={
              <>
                <SearchBar
                  // title="Поиск по чертежам"
                  fullSize
                  placeholder="Введите артикул чертежа для поиска..."
                  setSearchQuery={setSearchQueryCategory}
                />
                <TableView
                  drafts={drafts}
                  searchQuery={searchQueryCategory}
                  selectDraft={selectDraft}
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
          className="select-draft__error"
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
              ? 'select-draft__options'
              : 'select-draft__options select-draft__options--hidden'
          }
        >
          {search().map((item, index) => (
            <div
              id={item.id}
              key={index}
              type={item.type}
              number={item.number}
              optionId={index}
              name={item.name}
              className="select-draft__option_item"
              onClick={clickOnOption}
            >
              <div>{item.number + ', ' + item.name}</div>
            </div>
          ))}
        </div>
      )}
      <div className="select-draft__selected">
        {selected.map((item, index) => (
          <div className="select-draft__selected_row" key={index}>
            <div className="select-draft__selected_item">
              <input
                type="text"
                className="select-draft__selected_name"
                name_id={index}
                name="name"
                autoComplete="off"
                readOnly
                value={`${item.number || ''}, ${item.name}`}
                onChange={item.type === 'new' ? handleParamChange : null}
              />
              {!props.readOnly && !props.workshop && (
                <img
                  id={index}
                  className="select-draft__img"
                  src={deleteSVG}
                  alt=""
                  onClick={clickOnSelected}
                />
              )}
            </div>
            <div className="select-draft__selected_quantity">
              <span className="select-draft__input-name">
                Кол-во (шт.){!props.readOnly && '*'}
              </span>
              <input
                quantity_id={index}
                // type="text"
                type="number"
                name="quantity"
                autoComplete="off"
                defaultValue={item.quantity != 0 ? item.quantity : 0}
                value={item.quantity}
                onChange={handleParamChange}
                readOnly={props.readOnly}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SelectDraft;
