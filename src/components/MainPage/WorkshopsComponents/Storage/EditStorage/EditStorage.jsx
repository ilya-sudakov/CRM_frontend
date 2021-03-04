import { useEffect, useState } from 'react';
import './EditStorage.scss';
import 'Utils/Form/Form.scss';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import {
  updateStorage,
  getStorageById,
} from 'Utils/RequestsAPI/Workshop/storage.js';
import Button from 'Utils/Form/Button/Button.jsx';
import { workshops } from '../../workshopVariables.js';
import useForm from 'Utils/hooks/useForm';
import { workshopStorageDefaultInputs } from '../../objects';

const EditPart = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    updateFormInputs,
    formIsValid,
    errorWindow,
  } = useForm(workshopStorageDefaultInputs);
  const [storageId, setStorageId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    updateStorage(props.type, formInputs, storageId)
      .then(() => props.history.push(workshops[props.type].storageRedirectURL))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Редактирование детали';
    const id = props.history.location.pathname.split(
      `${workshops[props.type].storageRedirectURL}/edit/`,
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс детали!');
      props.history.push(workshops[props.type].storageRedirectURL);
    } else {
      setStorageId(id);
      getStorageById(props.type, id)
        .then(({ data }) =>
          updateFormInputs({
            name: data.name,
            number: data.number,
            quantity: data.quantity,
            comment: data.comment,
          }),
        )
        .catch((error) => {
          console.log(error);
          alert('Неправильный индекс детали!');
          props.history.push(workshops[props.type].storageRedirectURL);
        });
    }
  }, []);
  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование детали</div>
        </div>
        {errorWindow}
        <InputText
          inputName="Название"
          required
          error={formErrors.name}
          name="name"
          defaultValue={formInputs.name}
          handleInputChange={({ target }) =>
            handleInputChange('name', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputText
          inputName="Номер"
          required
          error={formErrors.number}
          name="number"
          type="number"
          defaultValue={formInputs.number}
          handleInputChange={({ target }) =>
            handleInputChange('number', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputText
          inputName="Кол-во"
          required
          error={formErrors.quantity}
          name="quantity"
          defaultValue={formInputs.quantity}
          handleInputChange={({ target }) =>
            handleInputChange('quantity', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputText
          inputName="Комментарий"
          required
          error={formErrors.comment}
          name="comment"
          defaultValue={formInputs.comment}
          handleInputChange={({ target }) =>
            handleInputChange('comment', target.value)
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
            onClick={() =>
              props.history.push(workshops[props.type].storageRedirectURL)
            }
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

export default EditPart;
