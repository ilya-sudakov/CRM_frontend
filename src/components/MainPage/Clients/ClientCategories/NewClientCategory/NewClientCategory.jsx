import { useState } from 'react';
import './NewClientCategory.scss';
import 'Utils/Form/Form.scss';
import { useForm } from 'Utils/hooks';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import { clientCategoriesDefaultInputs } from '../../objects';

const NewClientCategory = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(clientCategoriesDefaultInputs);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log(formInputs);
    if (!formIsValid()) return;
    setIsLoading(true);
    props
      .addCategory(formInputs)
      .then(() => {
        setIsLoading(false);
        props.onSubmit();
        props.setShowWindow(!props.showWindow);
      })
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  return (
    <div className="new-client-category">
      <div className="main-form">
        <form className="main-form__form">
          {errorWindow}
          <InputText
            inputName="Название категории"
            required
            error={formErrors.name}
            defaultValue={formInputs.name}
            name="name"
            handleInputChange={({ target }) =>
              handleInputChange('name', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Видимость*</div>
            <div className="main-form__input_field">
              <select
                name="visibility"
                onChange={({ target }) =>
                  handleInputChange('visibility', target.value)
                }
                defaultValue={formInputs.visibility}
              >
                <option value="all">Все</option>
                <option value="adminOnly">Только руководитель</option>
              </select>
            </div>
          </div>
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              text="Добавить категорию"
              isLoading={isLoading}
              className="main-form__submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewClientCategory;
