import { useState, useEffect } from 'react';
import './EditClientCategory.scss';
import 'Utils/Form/Form.scss';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import useForm from 'Utils/hooks/useForm';
import { clientCategoriesDefaultInputs } from '../../objects';

const EditClientCategory = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    updateFormInputs,
    errorWindow,
  } = useForm([
    ...clientCategoriesDefaultInputs,
    { name: 'id', defaultValue: 0 },
    { name: 'type', defaultValue: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(formInputs);
    formIsValid() &&
      props
        .editCategory(formInputs, formInputs.id)
        .then(() => {
          setIsLoading(false);
          props.onSubmit();
          props.setShowWindow(!props.showWindow);
        })
        .catch((error) => {
          setIsLoading(false);
          alert('Ошибка при редактировании записи');
          console.log(error);
        });
  };

  useEffect(() => {
    console.log(props.category);
    props.category !== null &&
      updateFormInputs({
        id: props.category.id,
        name: props.category.name,
        visibility: props.category.visibility,
        type: props.category.type,
      });
  }, [props.category]);

  return (
    <div className="edit-client-category">
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
                value={formInputs.visibility}
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
              text="Редактировать категорию"
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

export default EditClientCategory;
