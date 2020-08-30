import React, { useEffect, useState } from 'react'
import './Products.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../SearchBar/SearchBar.jsx'
import TableView from './TableView/TableView.jsx'
import {
  getProducts,
  deleteProduct,
  getProductsByCategory,
  getProductById,
  getProductsByLocation,
} from '../../../utils/RequestsAPI/Products.jsx'
import {
  getCategories,
  deleteCategory,
  getCategoriesNames,
} from '../../../utils/RequestsAPI/Products/Categories.jsx'
import { deletePackagingFromProduct } from '../../../utils/RequestsAPI/Products/packaging.js'
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx'
import TableViewCategory from './CategoryManagement/TableView/TableViewCategory.jsx'
import FloatingPlus from '../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import ControlPanel from '../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'

const Products = (props) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQueryCategory, setSearchQueryCategory] = useState('')
  const [showWindow, setShowWindow] = useState(false)

  useEffect(() => {
    document.title = 'Продукция'
    const abortController = new AbortController()
    categories.length === 0 && loadCategories(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    return deletePackagingFromProduct(id).then(() => {
      return deleteProduct(id).then(() => loadCategories())
    })
  }

  const deleteItemCategory = (event) => {
    const id = event.target.dataset.id
    deleteCategory(id).then(() => loadCategories())
  }

  const loadCategories = (signal) => {
    let categoriesArr = []
    let productsArr = []
    return getCategoriesNames(signal) //Только категории
      .then((res) => res.json())
      .then((res) => {
        setCategories([...res])
        //Загрузка по местоположению
        if (
          props.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_DISPATCHER',
            'ROLE_ENGINEER',
            'ROLE_MANAGER',
            'ROLE_WORKSHOP', //temp
          ])
        ) {
          categoriesArr = res
          // console.log(categoriesArr);
          Promise.all(
            categoriesArr.map((item) => {
              return getProductsByCategory({ category: item.category }, signal) //Продукция по категории
                .then((res) => res.json())
                .then((res) => {
                  res.map((item) => productsArr.push(item))
                  setProducts([...productsArr])
                })
            }),
          ).then(() => {
            Promise.all(
              productsArr.map((item, index) => {
                return getProductById(item.id, signal)
                  .then((res) => res.json())
                  .then((res) => {
                    //   console.log(res);
                    productsArr.splice(index, 1, res)
                    setProducts([...productsArr])
                  })
              }),
            ).then(() => {
              //   console.log(productsArr);
              return console.log('all images downloaded')
            })
          })
        }
      })
  }

  // * SORTING

  const [sortOrder, setSortOrder] = useState({
    curSort: 'name',
    name: 'asc',
  })

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0]
    const order = event.target.value.split(' ')[1]
    setSortOrder({
      curSort: name,
      [name]: order,
    })
  }

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase()
    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toString().includes(query) ||
        item.weight.toString().includes(query) ||
        (item.comment !== null && item.comment.toLowerCase().includes(query))
      )
    })
  }

  const sortProducts = (data) => {
    return data.sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
      }
      return 0
    })
  }

  return (
    <div className="products">
      <div className="main-window">
        <FloatingPlus
          linkTo="/products/new"
          visibility={['ROLE_ADMIN', 'ROLE_MANAGER']}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">
            <span>Продукция</span>
            {props.userHasAccess([
              'ROLE_ADMIN',
              'ROLE_MANAGER',
              'ROLE_ENGINEER',
            ]) && (
              <div
                className="main-window__button"
                onClick={() => setShowWindow(!showWindow)}
              >
                Категории
              </div>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                className="main-window__button"
                onClick={() => props.history.push('/packaging')}
              >
                Упаковки
              </div>
            )}
          </div>
        </div>
        <FormWindow
          title="Категории продукции"
          content={
            <React.Fragment>
              <FloatingPlus
                linkTo="/products/category/new"
                visibility={['ROLE_ADMIN']}
              />
              <SearchBar
                // title="Поиск по категориям"
                placeholder="Введите название категории для поиска..."
                setSearchQuery={setSearchQueryCategory}
              />
              <TableViewCategory
                data={categories}
                searchQuery={searchQueryCategory}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItemCategory}
              />
            </React.Fragment>
          }
          // headerButton={{
          //   name: 'Создать категорию',
          //   path: '/products/category/new',
          // }}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
        <SearchBar
          fullSize
          // title="Поиск продукции"
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          sorting={
            <div className="main-window__sort-panel">
              <select onChange={changeSortOrder}>
                <option value="name asc">По алфавиту (А-Я)</option>
                <option value="name desc">По алфавиту (Я-А)</option>
                <option value="weight desc">По весу</option>
              </select>
            </div>
          }
          itemsCount={`Всего: ${products.length} записей`}
        />
        <TableView
          products={sortProducts(filterSearchQuery(products))}
          categories={categories}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  )
}

export default Products
