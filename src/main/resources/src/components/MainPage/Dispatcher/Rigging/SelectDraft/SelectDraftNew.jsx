import React, { useState, useEffect, useCallback } from 'react'
import deleteSVG from '../../../../../../../../../assets/select/delete.svg'
import './SelectDraft.scss'
import { getStamp } from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import { getPressForm } from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx'
import { getMachine } from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'
import { getParts } from '../../../../../utils/RequestsAPI/Parts.jsx'
import Select from 'react-select'

const SelectDraftNew = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState([])
  const [drafts, setDrafts] = useState([])
  const [showOptions, setShowOptions] = useState(false)
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false)

  async function loadDrafts() {
    if (props.drafts) {
      setDrafts([...props.drafts])
    } else {
      let newDrafts = []
      getStamp()
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          response.map((item) => {
            return item.stampParts.map((stamp) => {
              newDrafts.push({
                ...stamp,
                value: stamp.id,
                label: stamp.name,
                type: 'Stamp',
              })
            })
          })
          // console.log(newDrafts);
          setDrafts([...newDrafts])
        })
        .then(() => {
          getPressForm()
            .then((response) => response.json())
            .then((response) => {
              // console.log(response);
              response.map((item) => {
                return item.pressParts.map((stamp) => {
                  newDrafts.push({
                    ...stamp,
                    value: stamp.id,
                    label: stamp.name,
                    type: 'Press',
                  })
                })
              })
              setDrafts([...newDrafts])
            })
            .then(() => {
              getMachine()
                .then((response) => response.json())
                .then((response) => {
                  // console.log(response)
                  response.map((item) => {
                    return item.benchParts.map((stamp) => {
                      newDrafts.push({
                        ...stamp,
                        value: stamp.id,
                        label: stamp.name,
                        type: 'Bench',
                      })
                    })
                  })
                  setDrafts([...newDrafts])
                  // console.log(newDrafts)
                })
            })
        })
        .then(() => {
          getParts()
            .then((res) => res.json())
            .then((res) => {
              // console.log(res)
              res.map((item) => {
                return item.detailParts.map((stamp) => {
                  newDrafts.push({
                    ...stamp,
                    value: stamp.id,
                    label: stamp.name,
                    type: 'Detail',
                  })
                })
              })
              setDrafts([...newDrafts])
              console.log(newDrafts)
            })
        })
    }
  }

  const clickOnOption = (selectedItem) => {
    const { name, id, type, number } = selectedItem
    setShowOptions(!showOptions)
    setSelected([
      ...selected,
      {
        partId: id,
        name: name,
        number: number,
        type: type,
        quantity: 0,
      },
    ])
    props.onChange([
      ...selected,
      {
        partId: id,
        type: type,
        number: number,
        name: name,
        quantity: 0,
      },
    ])
  }

  const clickOnSelected = (event) => {
    const id = event.target.getAttribute('id')
    let newSelected = selected
    newSelected.splice(id, 1)
    setSelected([...newSelected])
    props.onChange([...newSelected])
  }

  const handleParamChange = (event) => {
    const value = event.target.value
    const name = event.target.getAttribute('name')
    const id = event.target.getAttribute(name + '_id')
    let newSelected = selected
    newSelected = newSelected.map((item, index) => {
      return {
        ...item,
        [name]: index == id ? value : item[name],
      }
    })
    setSelected([...newSelected])
    props.onChange([...newSelected])
  }

  const pressEscKey = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowOptions(!showOptions)
    }
  }, [])

  useEffect(() => {
    if (props.defaultValue !== undefined && !defaultValueLoaded) {
      setSelected([...props.defaultValue])
      setDefaultValueLoaded(true)
    }
    document.addEventListener('keydown', pressEscKey, false)
    drafts.length === 0 && loadDrafts()
    // loadDrafts();
    return () => {
      document.removeEventListener('keydown', pressEscKey, false)
    }
  }, [props.defaultValue, props.categories, showOptions])

  return (
    <div className="select-draft select-draft--new">
      <div className="select-draft__input">
        <div className="select-draft__input_name">Чертежи</div>
        <Select
          // value={props.defaultValue.value === '' ? null : props.defaultValue}
          className="select-draft__input_field"
          options={drafts}
          styles={{
            menu: (styles) => {
              return {
                ...styles,
                zIndex: 999,
              }
            },
          }}
          placeholder="Выберите чертеж..."
          onChange={(value) => clickOnOption(value)}
        />
      </div>
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
      <div className="select-draft__selected">
        {selected.map((item, index) => (
          <div className="select-draft__selected_row">
            <div className="select-draft__selected_item">
              <input
                type="text"
                className="select-draft__selected_name"
                name_id={index}
                name="name"
                autoComplete="off"
                readOnly
                value={item.name}
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
  )
}
export default SelectDraftNew
