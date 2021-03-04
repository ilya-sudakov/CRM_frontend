import { useEffect, useState } from 'react';
import './EditTransportation.scss';
import 'Utils/Form/Form.scss';
import {
  getTransportationById,
  editTransportation,
} from 'Utils/RequestsAPI/Transportation.jsx';
import InputDate from 'Utils/Form/InputDate/InputDate.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import useForm from 'Utils/hooks/useForm.js';
import { transportationDefaultInputs } from '../objects.js';

const EditTransportation = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    updateFormInputs,
    formIsValid,
    errorWindow,
  } = useForm(transportationDefaultInputs);
  const [transportationId, setTransportationId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    editTransportation(formInputs, transportationId)
      .then(() => props.history.push('/dispatcher/transportation'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Редактирование записи транспортировки';
    const id = props.history.location.pathname.split(
      '/dispatcher/transportation/edit/',
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс транспортировки!');
      props.history.push('/dispatcher/transportation');
    } else {
      setTransportationId(id);
      getTransportationById(id)
        .then((res) => res.json())
        .then((data) => updateFormInputs(data))
        .catch((error) => {
          console.log(error);
          alert('Неправильный индекс транспортировки!');
          props.history.push('/dispatcher/transportation');
        });
    }
  }, []);
  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">
            Редактирование записи транспортировки
          </div>
        </div>
        {errorWindow}
        <InputDate
          inputName="Дата"
          required
          error={formErrors.date}
          name="date"
          selected={Date.parse(formInputs.date)}
          handleDateChange={(value) => handleInputChange('date', value)}
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />

        <div className="main-form__fieldset">
          <div className="main-form__group-name">Данные о грузе</div>
          <InputText
            inputName="Товар"
            required
            error={formErrors.cargo}
            name="cargo"
            handleInputChange={({ target }) =>
              handleInputChange('cargo', target.value)
            }
            defaultValue={formInputs.cargo}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Кол-во"
            name="quantity"
            defaultValue={formInputs.quantity}
            handleInputChange={({ target }) =>
              handleInputChange('quantity', target.value)
            }
          />
          <div className="main-form__row">
            <div className="main-form__item">
              <div className="main-form__input_name">Откуда*</div>
              <div className="main-form__input_field">
                <select
                  name="sender"
                  onChange={({ target }) =>
                    handleInputChange('sender', target.value)
                  }
                  value={formInputs.sender}
                >
                  <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                  <option value="ЦехЛепсари">ЦехЛепсари</option>
                  <option value="ЦехЛиговский">ЦехЛиговский</option>
                </select>
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Куда*</div>
              <div className="main-form__input_field">
                <select
                  name="recipient"
                  onChange={({ target }) =>
                    handleInputChange('recipient', target.value)
                  }
                  value={formInputs.recipient}
                >
                  <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                  <option value="ЦехЛепсари">ЦехЛепсари</option>
                  <option value="ЦехЛиговский">ЦехЛиговский</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <InputText
          inputName="Водитель"
          required
          error={formErrors.driver}
          name="driver"
          handleInputChange={({ target }) =>
            handleInputChange('driver', target.value)
          }
          defaultValue={formInputs.driver}
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => props.history.push('/dispatcher/transportation')}
            value="Вернуться назад"
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

export default EditTransportation;
