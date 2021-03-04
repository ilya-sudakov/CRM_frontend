import { useContext, useEffect, useState } from 'react';
import {
  getProductsByCategory,
  getProductsByLocation,
  getProductById,
} from '../../RequestsAPI/Products.js';
import { getCategoriesNames } from '../../RequestsAPI/Products/Categories.js';
import UserContext from '../../../App.js';

const useProductsList = (shouldExecute = true) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const userContext = useContext(UserContext);

  const loadData = () => {
    setIsLoadingProducts(true);
    return getCategoriesNames() //Только категории
      .then((res) => res.json())
      .then(async (res) => {
        let productsArr = [];
        const categoriesArr = res;
        setCategories(res);

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
              };
              return await getProductsByCategory(category) //Продукция по категории
                .then((res) => res.json())
                .then((res) => {
                  res.map((item) => productsArr.push(item));
                  setProducts([...productsArr]);
                  return;
                });
            }),
          );
        } else if (userContext.userHasAccess(['ROLE_WORKSHOP'])) {
          const usersWorkshop = userContext.userHasAccess(['ROLE_LEMZ'])
            ? 'ЦехЛЭМЗ'
            : userContext.userHasAccess(['ROLE_LEPSARI'])
            ? 'ЦехЛепсари'
            : userContext.userHasAccess(['ROLE_LIGOSVKIY'])
            ? 'ЦехЛиговский'
            : 'ЦехЛЭМЗ';

          await getProductsByLocation({
            productionLocation: usersWorkshop,
          })
            .then((res) => res.json())
            .then((res) => {
              res.map((item) => productsArr.push(item));
              setProducts([...productsArr]);
              return;
            });
        }

        return { productsArr, categoriesArr };
      })
      .then(({ productsArr }) =>
        //Загружаем картинки по отдельности для каждой продукции
        Promise.all(
          productsArr.map((item, index) =>
            getProductById(item.id)
              .then((res) => res.json())
              .then((res) => {
                // console.log(res);
                productsArr.splice(index, 1, res);
                setProducts([...productsArr]);
              }),
          ),
        ),
      )
      .then(() => {
        setIsLoadingProducts(false);
      })
      .catch((error) => {
        setIsLoadingProducts(false);
        console.error(error);
      });
  };

  useEffect(() => {
    if (!shouldExecute) return;
    const abortController = new AbortController();
    loadData(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  return { products, categories, isLoadingProducts };
};

export default useProductsList;
