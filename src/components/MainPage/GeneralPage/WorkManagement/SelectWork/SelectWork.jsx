import { useState, useEffect, useContext } from 'react';
import deleteSVG from '../../../../../../assets/select/delete.svg';
import './SelectWork.scss';
import SelectWorkItem from '../../../Work/SelectWorkItem/SelectWorkItem.jsx';
import InputProducts from '../../../../../utils/Form/InputProducts/InputProducts.jsx';
import SelectDraft from '../../../Dispatcher/Rigging/SelectDraft/SelectDraft.jsx';
import UserContext from '../../../../../App.js';
import AddToButton from '../../../../../utils/Form/AddToButton/AddToButton.jsx';
import useMessageForUser from '../../../../../utils/hooks/useMessageForUser';

const SelectWork = (props) => {
  const [selected, setSelected] = useState(props.defaultConfig ?? []);
  const userContext = useContext(UserContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { messageForUser, showMessage, setShowMessage } = useMessageForUser({
    title: 'Удаление элемента',
    message: 'Вы действительно хотите удалить этот элемент?',
    onClick: () => deletePart(selectedIndex),
    buttonText: 'ОК',
  });

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setSelected([...props.defaultValue]);
      const total = props.defaultValue.reduce(
        (sum, cur) => sum + Number.parseFloat(cur.hours),
        0,
      );
      if (!props.setTotalHours) return;
      if (isNaN(total)) {
        props.setTotalHours(0);
      } else props.setTotalHours(total);
    }
  }, [props.defaultValue, props.options, props.products]);

  const handleNewPart = () => {
    //Открыть по дефолту форму
    const id = selected.length;
    setSelected([
      ...selected,
      {
        product: [],
        draft: [],
        workName: '',
        workType: '',
        workId: null,
        hours: 0,
        comment: '',
      },
    ]);
    props.handleWorkChange([
      ...selected,
      {
        product: [],
        draft: [],
        workName: '',
        workId: null,
        workType: '',
        hours: 0,
        comment: '',
        isOld: false,
      },
    ]);
  };

  const deletePart = (id) => {
    let temp = selected;
    temp.splice(id, 1);
    setSelected([...temp]);
    const total = temp.reduce(
      (sum, cur) => sum + Number.parseFloat(cur.hours),
      0,
    );
    if (!props.setTotalHours) return;
    if (isNaN(total)) {
      props.setTotalHours(0);
    } else props.setTotalHours(total);
    props.handleWorkChange([...temp]);
  };

  const handleInputChange = (event) => {
    const id = event.target.getAttribute('index');
    const name = event.target.getAttribute('name');
    let value = event.target.value;
    const curSum = selected.reduce((sum, cur, curIndex) => {
      if (Number.parseInt(id) === curIndex) {
        return sum;
      } else {
        return Math.floor((sum + Number.parseFloat(cur.hours)) * 10) / 10;
      }
    }, 0);
    if (name === 'hours') {
      if (Number.parseFloat(event.target.value) > 12) {
        value = 12;
      } else {
        if (event.target.value === '') {
          value = 0;
        } else {
          value = Number.parseFloat(event.target.value);
        }
      }
      if (curSum + value > 12) {
        value = Math.floor((12 - curSum) * 10) / 10;
      }
    }
    let temp = selected;
    let originalItem = selected[id];
    temp.splice(id, 1, {
      ...originalItem,
      [name]: value,
    });
    if (!props.setTotalHours) return;
    if (name === 'hours') {
      if (isNaN(curSum)) {
        props.setTotalHours(0);
      } else {
        props.setTotalHours(curSum + value);
      }
    }
    setSelected([...temp]);
    props.handleWorkChange([...temp]);
  };

  return (
    <div className="select-work">
      {messageForUser}
      <div className="main-form__item">
        <div className="main-form__input_name main-form__input_name--header">
          Работы*
          {!props.readOnly && !props.noNewItems && (
            <AddToButton text="Добавить работу" onClick={handleNewPart} />
          )}
        </div>
        <div className="main-form__input_field">
          <div className="select-work__selected">
            {selected.map((item, index) => (
              <div
                className={
                  !props.readOnly && selected.length > 1
                    ? 'select-work__selected_item select-work__selected_item--minimized'
                    : 'select-work__selected_item'
                }
                key={index}
              >
                <div className="select-work__selected_form">
                  <SelectWorkItem
                    inputName="Выбор работы"
                    required
                    defaultValue={item.workName}
                    id={index}
                    handleWorkItemChange={(name, id, type) => {
                      console.log(name, id, type);
                      let temp = selected;
                      let originalItem = selected[index];
                      temp.splice(index, 1, {
                        ...originalItem,
                        workType: type,
                        workName: name,
                        workId: id,
                      });
                      setSelected([...temp]);
                      props.handleWorkChange([...temp]);
                    }}
                    userHasAccess={userContext.userHasAccess}
                    workItems={props.workItems}
                    readOnly={props.readOnly}
                  />
                  {selected[index].workType === 'Продукция' ||
                  selected[index].workType === undefined ||
                  selected[index].typeOfWork === 'Продукция' ? (
                    <div className="select-work__item select-work__item--products">
                      <div className="select-work__input_field">
                        <InputProducts
                          inputName="Продукция"
                          options
                          defaultValue={item.product}
                          categories={props.categories}
                          products={props.products}
                          numberInput
                          name="product"
                          noPackaging
                          onChange={(value) => {
                            // console.log(value)
                            let temp = selected;
                            let originalItem = selected[index];
                            temp.splice(index, 1, {
                              ...originalItem,
                              product: value,
                            });
                            setSelected([...temp]);
                            props.handleWorkChange([...temp]);
                          }}
                          userHasAccess={userContext.userHasAccess}
                          searchPlaceholder="Введите название продукта для поиска..."
                        />
                      </div>
                    </div>
                  ) : selected[index].workType === 'Чертеж' ? (
                    <SelectDraft
                      options
                      defaultValue={item.draft}
                      onChange={(value) => {
                        let temp = selected;
                        let originalItem = selected[index];
                        temp.splice(index, 1, {
                          ...originalItem,
                          draft: value,
                        });
                        setSelected([...temp]);
                        props.handleWorkChange([...temp]);
                      }}
                      searchPlaceholder={
                        "Добавьте чертеж нажав на кнопку 'Добавить чертеж'"
                      }
                      userHasAccess={userContext.userHasAccess}
                    />
                  ) : null}
                  {!props.noComment && (
                    <div className="select-work__item select-work__item--comment">
                      <div className="select-work__input_name">
                        Комментарий (необязательно)
                      </div>
                      <div className="select-work__input_field">
                        <textarea
                          type="text"
                          name="comment"
                          index={index}
                          autoComplete="off"
                          onChange={handleInputChange}
                          value={item.comment}
                          readOnly={props.readOnly}
                        />
                      </div>
                    </div>
                  )}
                  {!props.noTime && (
                    <div className="select-work__item select-work__item--time">
                      <div className="select-work__input_name">Часы</div>
                      <div className="select-work__input_field">
                        <input
                          type="number"
                          name="hours"
                          index={index}
                          autoComplete="off"
                          onChange={handleInputChange}
                          value={item.hours.toString()}
                          readOnly={props.readOnly}
                        />
                      </div>
                      {!props.readOnly && selected.length > 1 && (
                        <img
                          index={index}
                          onClick={deletePart}
                          className="select-work__img select-work__img--new"
                          src={deleteSVG}
                        />
                      )}
                    </div>
                  )}
                </div>
                {!props.readOnly && selected.length > 1 && (
                  <img
                    onClick={() => {
                      setSelectedIndex(index);
                      setShowMessage(!showMessage);
                    }}
                    className="select-work__img"
                    src={deleteSVG}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectWork;
