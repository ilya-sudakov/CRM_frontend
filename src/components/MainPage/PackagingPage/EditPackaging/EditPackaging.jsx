import { useState, useEffect } from 'react';
import './EditPackaging.scss';
import 'Utils/Form/Form.scss';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import {
  getPackagingById,
  editPackaging,
} from 'Utils/RequestsAPI/Products/packaging.js';
import { useForm } from 'Utils/hooks';
import { packagingDefaultInputs } from '../objects';

const EditPackaging = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    updateFormInputs,
    formIsValid,
    errorWindow,
  } = useForm(packagingDefaultInputs);
  const [packagingId, setPackagingId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    console.log(formInputs);
    editPackaging(packagingId, formInputs)
      .then(() => {})
      .then(() => props.history.push('/packaging'))
      .catch(() => {
        setIsLoading(false);
        alert('Ошибка при изменении записи');
      });
  };

  useEffect(() => {
    document.title = 'Редактирование упаковки';
    const id = props.history.location.pathname.split('/packaging/edit/')[1];
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс записи!');
      props.history.push('/packaging');
    } else {
      setPackagingId(id);
      getPackagingById(id)
        .then((res) => res.json())
        .then((oldPackaging) =>
          updateFormInputs({
            name: oldPackaging.name,
            comment: oldPackaging.comment,
            quantity: oldPackaging.quantity,
            size: oldPackaging.size,
          }),
        )
        .catch((error) => {
          console.log(error);
          alert('Неправильный индекс заявки!');
          props.history.push('/packaging');
        });
    }
  }, []);

  return (
    <div className="new-packaging">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Редактирование упаковки</div>
          </div>
          {errorWindow}
          <InputText
            inputName="Наименование"
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
          <InputText
            inputName="Кол-во штук"
            required
            defaultValue={formInputs.quantity}
            type="number"
            error={formErrors.quantity}
            name="quantity"
            handleInputChange={({ target }) =>
              handleInputChange('quantity', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Размер"
            required
            defaultValue={formInputs.size}
            error={formErrors.size}
            name="size"
            handleInputChange={({ target }) =>
              handleInputChange('size', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            defaultValue={formInputs.comment}
            inputName="Комментарий"
            name="comment"
            handleInputChange={({ target }) =>
              handleInputChange('comment', target.value)
            }
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => props.history.push('/packaging')}
              value="Вернуться назад"
            />
            <Button
              text="Редактировать упаковку"
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

export default EditPackaging;
