import { useEffect, useState } from 'react';
import {
  getProductsByCategory,
  getProductById,
} from '../../RequestsAPI/Products/products';
import { getCategoriesNames } from '../../RequestsAPI/Products/Categories.js';

const useProductsList = (shouldExecute = true) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const loadData = () => {
    setIsLoadingProducts(true);
    return getCategoriesNames() //Только категории
      .then((res) => res.json())
      .then(async (res) => {
        let productsArr = [];
        const categoriesArr = res;
        setCategories(res);
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
