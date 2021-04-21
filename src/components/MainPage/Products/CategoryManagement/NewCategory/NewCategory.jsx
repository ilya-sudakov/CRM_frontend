import { useEffect, useState } from 'react';
import './NewCategory.scss';
import 'Components/Form/Form.scss';
import InputText from 'Components/Form/InputText/InputText.jsx';
import { addCategory } from 'API/Products/Categories.js';
import Button from 'Components/Form/Button/Button.jsx';
import { useForm } from 'Utils/hooks';
import { productCategoriesDefaultInputs } from '../../objects';

const NewCategory = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(productCategoriesDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    addCategory(formInputs)
      .then(() => props.history.push('/products'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Создание категории';
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Создание категории</div>
        </div>
        {errorWindow}
        <InputText
          inputName="Название категории"
          required
          error={formErrors.category}
          name="category"
          defaultValue={formInputs.category}
          handleInputChange={({ target }) =>
            handleInputChange('category', target.value)
          }
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
            text="Добавить запись"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
