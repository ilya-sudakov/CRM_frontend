import React, { useState, useEffect, useContext } from "react";
import deleteSVG from "../../../../../../../../../assets/select/delete.svg";
import "./SelectWorkNew.scss";
import InputProducts from "../../../../../utils/Form/InputProducts/InputProducts.jsx";
import SelectDraft from "../../../Dispatcher/Rigging/SelectDraft/SelectDraft.jsx";
import UserContext from "../../../../../App.js";
import SelectDraftNew from "../../../Dispatcher/Rigging/SelectDraft/SelectDraftNew.jsx";
import InputProductsNew from "../../../../../utils/Form/InputProducts/InputProductsNew.jsx";
import AddToButton from "../../../../../utils/Form/AddToButton/AddToButton.jsx";
import SelectWorkItemMinimized from "../../../Work/SelectWorkItem/SelectWorkItemMinimized.jsx";
import InputProductsMini from "../../../../../utils/Form/InputProducts/InputProductsMini.jsx";

const SelectWorkNew = (props) => {
  const [selected, setSelected] = useState(props.defaultConfig ?? []);
  const [options, setOptions] = useState([]);
  const [curItemsType, setCurItemsType] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setSelected([...props.defaultValue]);
      // console.log(props.defaultValue);
      const total = props.defaultValue.reduce(
        (sum, cur) => sum + Number.parseFloat(cur.hours),
        0
      );
      if (!props.setTotalHours) return;
      if (isNaN(total)) {
        props.setTotalHours(0);
      } else props.setTotalHours(total);
    }
    if (props.options !== undefined) {
      setOptions([...props.options]);
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
        workName: "",
        workType: "",
        workId: null,
        hours: 0,
        comment: "",
      },
    ]);
    props.handleWorkChange([
      ...selected,
      {
        product: [],
        draft: [],
        workName: "",
        workId: null,
        workType: "",
        hours: 0,
        comment: "",
      },
    ]);
  };

  const deletePart = (e) => {
    const id = e.target.getAttribute("index");
    let temp = selected;
    temp.splice(id, 1);
    setSelected([...temp]);
    const total = temp.reduce(
      (sum, cur) => sum + Number.parseFloat(cur.hours),
      0
    );
    if (!props.setTotalHours) return;
    if (isNaN(total)) {
      props.setTotalHours(0);
    } else props.setTotalHours(total);
    props.handleWorkChange([...temp]);
  };

  const handleInputChange = (event) => {
    const id = event.target.getAttribute("index");
    const name = event.target.getAttribute("name");
    let value = event.target.value;
    const curSum = selected.reduce((sum, cur, curIndex) => {
      if (Number.parseInt(id) === curIndex) {
        return sum;
      } else {
        return Math.floor((sum + Number.parseFloat(cur.hours)) * 10) / 10;
      }
    }, 0);
    if (name === "hours") {
      if (Number.parseFloat(event.target.value) > 12) {
        value = 12;
      } else {
        if (event.target.value === "") {
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
    if (name === "hours") {
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
    <div className="select-work-new">
      <div className="select-work-new__header">
        {!props.readOnly && (
          <AddToButton text="Добавить работу" onClick={handleNewPart} />
        )}
      </div>
      <div className="select-work-new__content">
        <div className="select-work-new__list">
          {selected.map((item, index) => (
            <div
              className={
                !props.readOnly && selected.length > 1
                  ? "select-work-new__list-item select-work-new__list-item--minimized"
                  : "select-work-new__list-item"
              }
              key={index}
            >
              <div className="select-work-new__selected">
                <SelectWorkItemMinimized
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
                    setCurItemsType(type);
                    setSelected([...temp]);
                    props.handleWorkChange([...temp]);
                  }}
                  userHasAccess={userContext.userHasAccess}
                  readOnly={props.readOnly}
                />
                {selected[index].workType === "Продукция" ||
                selected[index].workType === undefined ||
                selected[index].typeOfWork === "Продукция" ? (
                  <div className="select-work-new__item select-work-new__item--products">
                    <div className="select-work-new__input_field">
                      <InputProductsMini
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
                        readOnly={props.readOnly}
                      />
                    </div>
                  </div>
                ) : selected[index].workType === "Чертеж" ? (
                  <div className="select-work-new__item select-work-new__item--drafts">
                    <div className="select-work-new__input_field">
                      <SelectDraftNew
                        options
                        defaultValue={item.draft}
                        drafts={props.drafts}
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
                        readOnly={props.readOnly}
                        userHasAccess={userContext.userHasAccess}
                      />
                    </div>
                  </div>
                ) : null}
                {!props.noComment && (
                  <div className="select-work-new__item select-work-new__item--comment">
                    <div className="select-work-new__input_name">
                      Комментарий
                    </div>
                    <div className="select-work-new__input_field">
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
                  <div className="select-work-new__item select-work-new__item--time">
                    <div className="select-work-new__input_name">Часы</div>
                    <div className="select-work-new__input_field">
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
                        className="select-work-new__img select-work-new__img--new"
                        src={deleteSVG}
                      />
                    )}
                  </div>
                )}
              </div>
              {!props.readOnly && selected.length > 1 && (
                <img
                  index={index}
                  onClick={deletePart}
                  className="select-work-new__img"
                  src={deleteSVG}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectWorkNew;
