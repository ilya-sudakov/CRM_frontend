import { useContext, useEffect, useState } from 'react'
import {
  getProductsByCategory,
  getProductsByLocation,
  getProductById,
} from '../../RequestsAPI/Products.js'
import { getCategoriesNames } from '../../RequestsAPI/Products/Categories.js'
import UserContext from '../../../App.js'

const useProductsList = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userContext = useContext(UserContext)

  const loadData = () => {
    setIsLoading(true)
    return getCategoriesNames() //Только категории
      .then((res) => res.json())
      .then(async (res) => {
        let productsArr = []
        const categoriesArr = res
        setCategories(res)

        if (
          userContext.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_DISPATCHER',
            'ROLE_ENGINEER',
            'ROLE_MANAGER',
            // 'ROLE_WORKSHOP', //Временно цеха видят всю продукцию
          ])
        ) {
          await Promise.all(
            categoriesArr.map(async (item) => {
              const category = {
                category: item.category,
              }
              return await getProductsByCategory(category) //Продукция по категории
                .then((res) => res.json())
                .then((res) => {
                  res.map((item) => productsArr.push(item))
                  setProducts([...productsArr])
                  return
                })
            }),
          )
        } else if (userContext.userHasAccess(['ROLE_WORKSHOP'])) {
          const usersWorkshop = userContext.userHasAccess(['ROLE_LEMZ'])
            ? 'ЦехЛЭМЗ'
            : userContext.userHasAccess(['ROLE_LEPSARI'])
            ? 'ЦехЛепсари'
            : userContext.userHasAccess(['ROLE_LIGOSVKIY'])
            ? 'ЦехЛиговский'
            : 'ЦехЛЭМЗ'

          await getProductsByLocation({
            productionLocation: usersWorkshop,
          })
            .then((res) => res.json())
            .then((res) => {
              res.map((item) => productsArr.push(item))
              setProducts([...productsArr])
              return
            })
        }

        return { productsArr, categoriesArr }
      })
      .then(({ productsArr }) =>
        //Загружаем картинки по отдельности для каждой продукции
        Promise.all(
          productsArr.map((item, index) =>
            getProductById(item.id)
              .then((res) => res.json())
              .then((res) => {
                // console.log(res);
                productsArr.splice(index, 1, res)
                setProducts([...productsArr])
              }),
          ),
        ),
      )
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error(error)
      })
  }

  useEffect(async () => {
    await loadData()
  }, [])

  useEffect(() => {}, [products, categories, isLoading])

  return { products, categories, isLoading }
}

export default useProductsList
