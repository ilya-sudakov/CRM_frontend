import { useEffect, useState } from 'react';
import Select from 'react-select';
import './NewWork.scss';
import '../../../../utils/Form/Form.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import { addWork } from '../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx';
import Button from '../../../../utils/Form/Button/Button.jsx';
import { customSelectStyles } from '../../../../utils/dataObjects';
import useForm from '../../../../utils/hooks/useForm';
import { workItemDefaultInputs } from '../objects';

const NewWork = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(workItemDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    console.log(formInputs);
    addWork(formInputs)
      .then(() => props.history.push('/work-list'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Создание работы';
  }, []);

  const workTypes = [
    { label: 'Продукция', value: 'Продукция' },
    { label: 'Чертеж', value: 'Чертеж' },
    {
      label: 'Без продукции/чертежа',
      value: 'Без продукции/чертежа',
    },
  ];

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Создание работы</div>
        </div>
        {errorWindow}
        <InputText
          inputName="Название работы"
          required
          error={formErrors.work}
          name="work"
          handleInputChange={({ target }) =>
            handleInputChange('work', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Тип работы</div>
          <div className="main-form__input_field">
            <Select
              defaultValue={workTypes[0]}
              styles={customSelectStyles}
              onChange={(value) => handleInputChange('typeOfWork', value.label)}
              options={workTypes}
            />
          </div>
        </div>
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <Button
            className="main-form__submit main-form__submit--inverted"
            inverted
            onClick={() => props.history.push('/work-list')}
            text="Вернуться назад"
          />
          <Button
            text="Добавить работу"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default NewWork;
