import { useEffect, useState } from 'react';
import { getCategoriesNames } from '../../RequestsAPI/Products/Categories.js';

const useProductCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const loadData = () => {
    setIsLoadingCategories(true);
    return getCategoriesNames() //Только категории
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
        setIsLoadingCategories(false);
        return;
      })
      .catch((error) => {
        setIsLoadingCategories(false);
        console.error(error);
        return;
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    loadData(abortController.signal);

    return function cancel() {
      abortController.abort();
    };
  }, []);

  return { categories, isLoadingCategories };
};

export default useProductCategoriesList;
