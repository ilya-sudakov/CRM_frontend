import React, { useState, useEffect, useCallback, useContext } from 'react'
import deleteSVG from '../../../../../../../assets/select/delete.svg'
import './Select.scss'
import { getCategoriesNames } from '../../../utils/RequestsAPI/Products/Categories.jsx'
import ColorPicker from './ColorPicker/ColorPicker.jsx'
import {
  getProductsByCategory,
  getProductById,
  getProductsByLocation,
} from '../../../utils/RequestsAPI/Products.jsx'
// import { addSpaceDelimiter } from '../../../utils/functions.jsx'
import { UserContext } from '../../../App.js'
import Select from 'react-select'

const SelectNew = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
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
      setProducts([
        ...props.products.map((product) => {
          return {
            ...product,
            label: product.name,
            value: product.id,
          }
        }),
      ])
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
              'ROLE_WORKSHOP', //temp
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
          } else if (userContext.userHasAccess(['ROLE_WORKSHOP'])) {
            temp = getProductsByLocation({
              productionLocation: userContext.userHasAccess(['ROLE_LEMZ'])
                ? 'ЦехЛЭМЗ'
                : userContext.userHasAccess(['ROLE_LEPSARI'])
                ? 'ЦехЛепсари'
                : 'ЦехЛЭМЗ',
            })
              .then((res) => res.json())
              .then((res) => {
                res.map((item) => productsArr.push(item))
                setProducts([...productsArr])
              })
          }
          Promise.all(temp)
            .then(() => {
              //Загружаем картинки по отдельности для каждой продукции
              return Promise.all(
                productsArr.map((item, index) => {
                  getProductById(item.id)
                    .then((res) => res.json())
                    .then((res) => {
                      // console.log(res);
                      productsArr.splice(index, 1, res)
                      setProducts([...productsArr])
                    })
                }),
              )
            })
            .then(() => {
              // console.log('all images downloaded');
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const clickOnOption = (selectedItem) => {
    const { name, id, productId } = selectedItem
    setSelected([
      ...selected,
      {
        id: id,
        name: name,
        quantity: 0,
        quantityNew: 0,
        packaging: '',
        // packaging: null,
        status: 'production',
        productId: productId,
      },
    ])
    props.onChange([
      ...selected,
      {
        id: id,
        name: name,
        quantity: 0,
        quantityNew: 0,
        packaging: '',
        // packaging: null,
        status: 'production',
        productId: productId,
      },
    ])
  }

  const selectProduct = (id, value, productId) => {
    setSelected([
      ...selected,
      {
        id: id,
        name: value,
        quantity: 0,
        quantityNew: 0,
        packaging: '',
        // packaging: null,
        status: 'production',
        productId: productId,
      },
    ])
    props.onChange([
      ...selected,
      {
        id: id,
        name: value,
        quantity: 0,
        quantityNew: 0,
        packaging: '',
        // packaging: null,
        status: 'production',
        productId: productId,
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
    const productId = event.target.getAttribute(productId)
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
    categories.length === 0 && loadCategories()
  }, [props.defaultValue, props.categories, showOptions, showOverlay])

  // LAYOUT OPTIONS, RENDER FUNCTIONS

  const customLayoutOptions = {
    productName: {
      render: (index, item, options) =>
        renderSelectedItemName(index, item, options),
    },
    quantity: {
      render: (index, item, options) => renderQuantity(index, item, options),
    },
    newQuantity: {
      render: (index, item, options) => renderNewQuantity(index, item, options),
    },
    packaging: {
      render: (index, item, options) => renderPackaging(index, item, options),
    },
    selectPackaging: {
      render: (index, item, options) =>
        renderSelectPackaging(index, item, options),
    },
  }

  const renderQuantity = (
    index,
    item,
    options = {
      customName: `Кол-во (шт.)${!props.readOnly ? '*' : ''}`,
      readOnly: false,
    },
  ) => {
    return (
      <div className="select__selected_quantity">
        <span>{options.customName}</span>
        <input
          quantity_id={index}
          type={props.numberInput ? 'number' : 'text'}
          name="quantity"
          autoComplete="off"
          defaultValue={item.quantity != 0 ? item.quantity : 0}
          value={item.quantity}
          onChange={handleParamChange}
          disabled={props.readOnly || props.workshop || options.readOnly}
        />
      </div>
    )
  }

  const renderNewQuantity = (
    index,
    item,
    options = {
      customName: `Отгружено (шт.)${!props.readOnly ? '*' : ''}`,
      readOnly: false,
    },
  ) => {
    return (
      <div className="select__selected_quantity">
        <span>{options.customName}</span>
        <input
          quantityNew_id={index}
          type="number"
          name="quantityNew"
          autoComplete="off"
          defaultValue={0}
          value={item.quantityNew}
          onChange={handleParamChange}
          disabled={options.readOnly}
        />
      </div>
    )
  }

  const renderPackaging = (
    index,
    item,
    options = {
      customName: `Фасовка${!props.readOnly ? '*' : ''}`,
      readOnly: false,
      marginRight: '0px',
    },
  ) => {
    return (
      <div
        className="select__selected_packaging"
        style={{ marginRight: options.marginRight }}
      >
        <span>{options.customName}</span>
        <input
          packaging_id={index}
          type="text"
          name="packaging"
          autoComplete="off"
          defaultValue={item.packaging}
          value={item.packaging}
          onChange={handleParamChange}
          disabled={options.readOnly || props.workshop}
        />
      </div>
    )
  }

  const renderSelectPackaging = (index, item) => {
    return (
      <select
        onChange={handleParamChange}
        packaging_id={index}
        name="packaging"
        defaultValue={item.packaging}
        value={item.packaging}
        disabled={props.readOnly || props.workshop}
      >
        {products
          .find((product) => product.id === Number.parseInt(item.productId))
          ?.packings?.map((packagingItem) => (
            <option value={packagingItem.id}>{packagingItem.name}</option>
          ))}
      </select>
    )
  }

  const renderSelectedItemName = (
    index,
    item,
    options = {
      readOnly: false,
      showColorPicker: true,
      showDelete: true,
    },
  ) => {
    return (
      <div
        className={
          'select__selected_item select__selected_item--' +
          (item.status ? item.status : 'production')
        }
      >
        {!props.readOnly && options.showColorPicker ? (
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
    )
  }

  return (
    <div className="select select--new">
      <div className="select__input">
        <div className="select__input_name">Продукция</div>
        <Select
          // value={props.defaultValue.value === '' ? null : props.defaultValue}
          className="select__input_field"
          options={products}
          styles={{
            menu: (styles) => {
              return {
                ...styles,
                zIndex: 999,
              }
            },
          }}
          placeholder={
            products.length > 0 ? 'Выберите продукцию...' : 'Идет загрузка...'
          }
          isDisabled={products.length === 0}
          onChange={(value) => clickOnOption(value)}
        />
      </div>
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
      {selected.length > 0 ? (
        <div className="select__selected">
          {selected.map((item, index) => (
            <div
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
                    )
                  })}
                </>
              ) : (
                <>
                  {renderSelectedItemName(index, item)}
                  {renderQuantity(index, item)}
                  {!props.noPackaging && renderPackaging(index, item)}
                </>
              )}
              {/* {!props.noPackaging && renderSelectPackaging(index, item, products)} */}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
export default SelectNew
