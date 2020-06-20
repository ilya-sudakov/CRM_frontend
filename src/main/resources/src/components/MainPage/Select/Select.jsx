import React, { useState, useEffect, useCallback, useContext } from 'react'
import deleteSVG from '../../../../../../../assets/select/delete.svg'
import './Select.scss'
import SearchBar from '../SearchBar/SearchBar.jsx'
import TableView from '../Products/TableView/TableView.jsx'
import {
  getCategories,
  getCategoriesNames,
} from '../../../utils/RequestsAPI/Products/Categories.jsx'
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx'
import ColorPicker from './ColorPicker/ColorPicker.jsx'
import {
  getProductsByCategory,
  getProductById,
  getProductsByLocation,
} from '../../../utils/RequestsAPI/Products.jsx'
import ImgLoader from '../../../utils/TableView/ImgLoader/ImgLoader.jsx'
import { addSpaceDelimiter } from '../../../utils/functions.jsx'
import { UserContext } from '../../../App.js'

const Select = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQueryCategory, setSearchQueryCategory] = useState('')
  const [selected, setSelected] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [showWindow, setShowWindow] = useState(false)
  const [closeWindow, setCloseWindow] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const userContext = useContext(UserContext)

  const search = () => {
    // console.log(products);
    let searchArr = searchQuery.split(' ')
    return (props.products ? props.products : products).filter((item) => {
      let check = true
      searchArr.map((searchWord) => {
        if (
          item.name.toLowerCase().includes(searchWord.toLowerCase()) === false
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

  const clickOnInput = () => {
    setShowOverlay(!showOverlay)
    return setShowOptions(!showOptions)
  }

  const clickOverlay = () => {
    if (showOverlay) {
      clickOnInput()
    }
  }

  async function loadCategories() {
    //Динамическая загрузка продукции
    if (props.categories && props.products) {
      // console.log('already have loaded products');
      // console.log(props.products);
      setCategories([...props.categories])
      setProducts([...props.products])
    } else {
      getCategoriesNames() //Только категории
        .then((res) => res.json())
        .then((res) => {
          const categoriesArr = res
          setCategories(res)
          let productsArr = []
          let temp
          if (
            userContext.userHasAccess([
              'ROLE_ADMIN',
              'ROLE_DISPATCHER',
              'ROLE_ENGINEER',
              'ROLE_MANAGER',
            ])
          ) {
            temp = categoriesArr.map((item) => {
              let category = {
                category: item.category,
              }
              return getProductsByCategory(category) //Продукция по категории
                .then((res) => res.json())
                .then((res) => {
                  res.map((item) => productsArr.push(item))
                  setProducts([...productsArr])
                })
            })
          } else if (userContext.userHasAccess(['ROLE_LEMZ'])) {
            temp = getProductsByLocation({
              productionLocation: 'ЦехЛЭМЗ',
            })
              .then((res) => res.json())
              .then((res) => {
                res.map((item) => productsArr.push(item))
                setProducts([...productsArr])
              })
          } else if (userContext.userHasAccess(['ROLE_LEPSARI'])) {
            temp = getProductsByLocation({
              productionLocation: 'ЦехЛепсари',
            })
              .then((res) => res.json())
              .then((res) => {
                res.map((item) => productsArr.push(item))
                setProducts([...productsArr])
              })
          }
          Promise.all(temp).then(() => {
            //Загружаем картинки по отдельности для каждой продукции
            const temp = productsArr.map((item, index) => {
              getProductById(item.id)
                .then((res) => res.json())
                .then((res) => {
                  // console.log(res);
                  productsArr.splice(index, 1, res)
                  setProducts([...productsArr])
                })
            })
            Promise.all(temp).then(() => {
              // console.log('all images downloaded');
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const clickOnOption = (event) => {
    const value = event.currentTarget.getAttribute('name')
    const id = event.currentTarget.getAttribute('id')
    // console.log(value, id);
    clickOnInput()
    setSelected([
      ...selected,
      {
        id: id,
        name: value,
        quantity: 0,
        packaging: '',
        status: 'production',
      },
    ])
    props.onChange([
      ...selected,
      {
        id: id,
        name: value,
        quantity: 0,
        packaging: '',
        status: 'production',
      },
    ])
  }

  const selectProduct = (id, value) => {
    setSelected([
      ...selected,
      {
        id: id,
        name: value,
        quantity: 0,
        packaging: '',
        status: 'production',
      },
    ])
    props.onChange([
      ...selected,
      {
        id: id,
        name: value,
        quantity: 0,
        packaging: '',
        status: 'production',
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

  const handleStatusChange = (color, id) => {
    let newSelected = selected
    newSelected = newSelected.map((item, index) => {
      return {
        ...item,
        status: item.id == id ? color : item.status,
      }
    })
    setSelected([...newSelected])
    // console.log(color, id, newSelected);
    props.onChange([...newSelected])
  }

  const pressEscKey = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        console.log(showOptions, showOverlay)

        if (showOptions) {
          return clickOnInput()
        }
      }
    },
    [showOptions, showOverlay],
  )

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setSelected([...props.defaultValue])
    }
    document.addEventListener('keydown', pressEscKey, false)
    categories.length === 0 && loadCategories()
    return () => {
      document.removeEventListener('keydown', pressEscKey, false)
    }
  }, [props.defaultValue, props.categories, showOptions, showOverlay])

  return (
    <div className="select">
      <div
        className={
          showOverlay
            ? 'select__overlay'
            : 'select__overlay select__overlay--hidden'
        }
        onClick={clickOverlay}
      ></div>
      {!props.readOnly && !props.workshop && (
        <div className="select__searchbar">
          <button
            className="select__search_button"
            onClick={(e) => {
              e.preventDefault()
              setShowWindow(!showWindow)
            }}
          >
            Добавить продукцию
          </button>
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
              <React.Fragment>
                <SearchBar
                  title="Поиск по продукции"
                  placeholder="Введите название продукции для поиска..."
                  setSearchQuery={setSearchQueryCategory}
                />
                <TableView
                  // products={products}
                  products={props.products ? props.products : products}
                  categories={categories}
                  searchQuery={searchQueryCategory}
                  deleteItem={null}
                  selectProduct={selectProduct}
                  closeWindow={closeWindow}
                  setCloseWindow={setCloseWindow}
                  setShowWindow={setShowWindow}
                />
              </React.Fragment>
            }
            headerButton={
              userContext.userHasAccess(['ROLE_ADMIN'])
                ? {
                    name: 'Создать продукцию',
                    path: '/products/new',
                  }
                : null
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
              id={item.id}
              optionId={index}
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
          <span className="select__selected_title">Выбранная продукция:</span>
        )}
        {selected.map((item, index) => (
          <div
            className={
              !props.readOnly && !props.workshop
                ? 'select__selected_row'
                : 'select__selected_row select__selected_row--minimized'
            }
          >
            {/* <img className="select__selected_photo" src={item.product ? item.product.photo : null} alt="" /> */}
            <div
              className={
                'select__selected_item select__selected_item--' +
                (item.status ? item.status : 'production')
              }
            >
              {!props.readOnly ? (
                <ColorPicker
                  defaultName={item.name}
                  id={item.id}
                  handleStatusChange={handleStatusChange}
                />
              ) : (
                <div className="select__selected_name">{item.name}</div>
              )}
              <img
                id={index}
                className="select__img"
                src={deleteSVG}
                alt=""
                onClick={clickOnSelected}
              />
            </div>
            <div className="select__selected_quantity">
              <span>
                Кол-во
                {!props.readOnly && '*'}
              </span>
              <input
                quantity_id={index}
                type={props.numberInput ? 'number' : 'text'}
                name="quantity"
                autoComplete="off"
                defaultValue={item.quantity != 0 ? item.quantity : 0}
                value={item.quantity}
                onChange={handleParamChange}
                readOnly={props.readOnly}
              />
            </div>
            {!props.noPackaging && (
              <div className="select__selected_packaging">
                <span>
                  Фасовка
                  {!props.readOnly && '*'}
                </span>
                <input
                  packaging_id={index}
                  type="text"
                  name="packaging"
                  autoComplete="off"
                  defaultValue={item.packaging}
                  value={item.packaging}
                  onChange={handleParamChange}
                  readOnly={props.readOnly || props.workshop}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Select
