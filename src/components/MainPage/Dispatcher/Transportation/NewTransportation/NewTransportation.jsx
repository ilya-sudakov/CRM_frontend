import React, { useEffect, useState } from 'react';
import './NewTransportation.scss';
import '../../../../../utils/Form/Form.scss';
import { addTransportation } from '../../../../../utils/RequestsAPI/Transportation.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import Button from '../../../../../utils/Form/Button/Button.jsx';
import useForm from '../../../../../utils/hooks/useForm.js';
import { transportationDefaultInputs } from '../objects.js';

const NewTransportation = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(transportationDefaultInputs);

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    addTransportation(formInputs)
      .then(() => props.history.push('/dispatcher/transportation'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Создание записи транспортировки';
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Новая запись транспортировки</div>
        </div>
        {errorWindow}
        <InputDate
          inputName="Дата"
          required
          error={formErrors.date}
          name="date"
          selected={formInputs.date}
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
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Кол-во"
            name="quantity"
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
                  defaultValue={formInputs.sender}
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
                  defaultValue={formInputs.recipient}
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

export default NewTransportation;
