import React, { useState, useEffect } from 'react'
import deleteSVG from '../../../../../../../../../assets/select/delete.svg'
import './SelectWork.scss'
import SelectWorkItem from '../../../Work/SelectWorkItem/SelectWorkItem.jsx'
import InputProducts from '../../../../../utils/Form/InputProducts/InputProducts.jsx'
import SelectDraft from '../../../Dispatcher/Rigging/SelectDraft/SelectDraft.jsx'

const SelectWork = (props) => {
  const [selected, setSelected] = useState([
    {
      product: [],
      workName: '',
      workType: '',
      workId: null,
      hours: 0,
      draft: [],
    },
  ])
  const [options, setOptions] = useState([])
  const [curItemsType, setCurItemsType] = useState('')

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setSelected([...props.defaultValue])
      // console.log(props.defaultValue);
      const total = props.defaultValue.reduce(
        (sum, cur) => sum + Number.parseFloat(cur.hours),
        0,
      )
      if (isNaN(total)) {
        props.setTotalHours(0)
      } else props.setTotalHours(total)
    }
    if (props.options !== undefined) {
      setOptions([...props.options])
    }
  }, [props.defaultValue, props.options, props.products])

  const handleNewPart = (e) => {
    e.preventDefault()
    //Открыть по дефолту форму
    const id = selected.length
    setSelected([
      ...selected,
      {
        product: [],
        draft: [],
        workName: '',
        workType: '',
        workId: null,
        hours: 0,
      },
    ])
    props.handleWorkChange([
      ...selected,
      {
        product: [],
        draft: [],
        workName: '',
        workId: null,
        workType: '',
        hours: 0,
      },
    ])
    // const form = document.getElementsByClassName("select-work__selected_form")[0];
    // console.log(form);

    // form.classList.remove("select-work__selected_form--hidden");
  }

  const deletePart = (e) => {
    const id = e.target.getAttribute('index')
    let temp = selected
    temp.splice(id, 1)
    setSelected([...temp])
    const total = temp.reduce(
      (sum, cur) => sum + Number.parseFloat(cur.hours),
      0,
    )
    if (isNaN(total)) {
      props.setTotalHours(0)
    } else props.setTotalHours(total)
    props.handleWorkChange([...temp])
  }

  const handleInputChange = (event) => {
    const id = event.target.getAttribute('index')
    const name = event.target.getAttribute('name')
    let value = event.target.value
    const curSum = selected.reduce((sum, cur, curIndex) => {
      if (Number.parseInt(id) === curIndex) {
        return sum
      } else {
        return Math.floor((sum + Number.parseFloat(cur.hours)) * 10) / 10
      }
    }, 0)
    if (name === 'hours') {
      if (Number.parseFloat(event.target.value) > 12) {
        value = 12
      } else {
        if (event.target.value === '') {
          value = 0
        } else {
          value = Number.parseFloat(event.target.value)
        }
      }
      if (curSum + value > 12) {
        value = Math.floor((12 - curSum) * 10) / 10
      }
    }
    let temp = selected
    let originalItem = selected[id]
    temp.splice(id, 1, {
      ...originalItem,
      [name]: value,
    })
    if (name === 'hours') {
      if (isNaN(curSum)) {
        props.setTotalHours(0)
      } else {
        props.setTotalHours(curSum + value)
      }
    }
    setSelected([...temp])
    props.handleWorkChange([...temp])
  }

  return (
    <div className="select-work">
      {!props.readOnly && (
        <button className="select-work__button" onClick={handleNewPart}>
          Добавить работу
        </button>
      )}
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
            {/* <div className="select-work__selected_header" index={index} onClick={clickOnForm}>
                            <div className="select-work__selected_name">
                                <span>Работа: </span> {item.workName}
                            </div>
                            <div className="select-work__selected_name">
                                <span>Продукция: </span> {(item.product.length > 0) && item.product.reduce((sum, item) => sum + item.name + ', ', '')}
                            </div>
                        </div> */}
            <div className="select-work__selected_form">
              <SelectWorkItem
                inputName="Выбор работы"
                required
                defaultValue={item.workName}
                id={index}
                handleWorkItemChange={(name, id, type) => {
                  console.log(name, id, type)
                  let temp = selected
                  let originalItem = selected[index]
                  temp.splice(index, 1, {
                    ...originalItem,
                    workType: type,
                    workName: name,
                    workId: id,
                  })
                  setCurItemsType(type)
                  setSelected([...temp])
                  props.handleWorkChange([...temp])
                }}
                userHasAccess={props.userHasAccess}
                readOnly
              />
              {/* Вставить InputProducts, только вместо фасовки сделать 
                                единицу измерения(или просто кол-во оставить) */}
              {selected[index].workType === 'Продукция' ||
              selected[index].workType === undefined ||
              selected[index].typeOfWork === 'Продукция' ? (
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
                    let temp = selected
                    let originalItem = selected[index]
                    temp.splice(index, 1, {
                      ...originalItem,
                      product: value,
                    })
                    setSelected([...temp])
                    props.handleWorkChange([...temp])
                  }}
                  userHasAccess={props.userHasAccess}
                  searchPlaceholder="Введите название продукта для поиска..."
                  // workshop={props.userHasAccess(['ROLE_WORKSHOP'])}
                />
              ) : selected[index].workType === 'Чертеж' ? (
                <div className="select-work__item">
                  <div className="select-work__input_name">Чертежи</div>
                  <div className="select-work__input_field">
                    <SelectDraft
                      options
                      defaultValue={item.draft}
                      onChange={(value) => {
                        let temp = selected
                        let originalItem = selected[index]
                        temp.splice(index, 1, {
                          ...originalItem,
                          draft: value,
                        })
                        setSelected([...temp])
                        props.handleWorkChange([...temp])
                      }}
                      searchPlaceholder={
                        "Добавьте чертеж нажав на кнопку 'Добавить чертеж'"
                      }
                      userHasAccess={props.userHasAccess}
                    />
                  </div>
                </div>
              ) : null}
              {!props.noTime && (
                <div className="select-work__item">
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
                </div>
              )}
            </div>
            {!props.readOnly && selected.length > 1 && (
              <img
                index={index}
                onClick={deletePart}
                className="select-work__img"
                src={deleteSVG}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectWork
