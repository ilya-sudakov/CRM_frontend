import { useEffect, useState } from 'react';
import './EditCategory.scss';
import 'Components/Form/Form.scss';
import InputText from 'Components/Form/InputText/InputText.jsx';
import { getCategoryById, editCategory } from 'API/Products/Categories.js';
import Button from 'Components/Form/Button/Button.jsx';
import { productCategoriesDefaultInputs } from '../../objects';
import { useForm } from 'Utils/hooks';

const EditCategory = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    updateFormInputs,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(productCategoriesDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    editCategory(formInputs, categoryId)
      .then(() => props.history.push('/products'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Редактирование категории';
    const id = props.history.location.pathname.split(
      '/products/category/edit/',
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!');
      props.history.push('/products');
    } else {
      setCategoryId(id);
      getCategoryById(id)
        .then((res) => res.json())
        .then((oldProduct) => {
          updateFormInputs({
            category: oldProduct.category,
          });
        })
        .catch((error) => {
          console.log(error);
          alert('Неправильный индекс категории!');
          props.history.push('/products');
        });
    }
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование категории</div>
        </div>
        {errorWindow}
        <InputText
          inputName="Название категории"
          required
          error={formErrors.category}
          defaultValue={formInputs.category}
          handleInputChange={({ target }) =>
            handleInputChange('category', target.value)
          }
          name="category"
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <Button
            className="main-form__submit main-form__submit--inverted"
            inverted
            onClick={() => props.history.push('/products')}
            text="Вернуться назад"
          />
          <Button
            text="Редактировать запись"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
