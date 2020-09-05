import React, { useState, useEffect, useCallback } from 'react'
import deleteSVG from '../../../../../../../../../assets/select/delete.svg'
import './SelectDraft.scss'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import TableView from './TableView/TableView.jsx'
import FormWindow from '../../../../../utils/Form/FormWindow/FormWindow.jsx'
import ImgLoader from '../../../../../utils/TableView/ImgLoader/ImgLoader.jsx'
import { getStamp } from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import { getPressForm } from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx'
import { getMachine } from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'
import { getParts } from '../../../../../utils/RequestsAPI/Parts.jsx'

const SelectDraft = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQueryCategory, setSearchQueryCategory] = useState('')
  const [selected, setSelected] = useState([])
  const [drafts, setDrafts] = useState([])
  const [showWindow, setShowWindow] = useState(false)
  const [closeWindow, setCloseWindow] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false)

  const search = () => {
    // console.log(drafts);
    let re = /[.,\s]/gi
    const query = searchQuery.toLowerCase()
    let searchArr = query.split(' ')
    return (props.drafts ? props.drafts : drafts).filter((item) => {
      let check = true
      searchArr.map((searchWord) => {
        if (
          item.name.toLowerCase().includes(searchWord.toLowerCase()) ===
            false &&
          item.number
            .toLowerCase()
            .replace(re, '')
            .includes(query.replace(re, '')) === false
        )
          check = false
      })
      if (check === true) {
        return true
      } else {
        return false
      }
    })
  }

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

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

  const clickOnOption = (event) => {
    const value = event.currentTarget.getAttribute('name')
    const id = event.currentTarget.getAttribute('id')
    const type = event.currentTarget.getAttribute('type')
    const number = event.currentTarget.getAttribute('number')
    setShowOptions(!showOptions)
    setSelected([
      ...selected,
      {
        partId: id,
        name: value,
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
        name: value,
        quantity: 0,
      },
    ])
  }

  const selectDraft = (id, value, type, number) => {
    setSelected([
      ...selected,
      {
        partId: id,
        type: type,
        name: value,
        number: number,
        quantity: 0,
      },
    ])
    props.onChange([
      ...selected,
      {
        partId: id,
        type: type,
        name: value,
        number: number,
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
    <div className="select-draft">
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
          <div className="select-draft__buttons">
            <button
              className="select-draft__search_button"
              onClick={(e) => {
                e.preventDefault()
                setShowWindow(!showWindow)
              }}
            >
              Добавить чертеж
            </button>
          </div>
          <input
            type="text"
            className={
              props.error === true
                ? 'select-draft__input select-draft__input--error'
                : 'select-draft__input'
            }
            onChange={handleInputChange}
            onClick={() => {
              !props.readOnly && setShowOptions(!showOptions)
            }}
            placeholder={props.searchPlaceholder}
            readOnly={props.readOnly || props.workshop}
          />
          <FormWindow
            title="Выбор чертежа"
            content={
              <React.Fragment>
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
              </React.Fragment>
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
        {selected.length !== 0 && (
          <span className="select-draft__selected_title">
            Выбранные чертежи:
          </span>
        )}
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
              Кол-во{!props.readOnly && '*'}
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
export default SelectDraft
