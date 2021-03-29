import { useState, useEffect } from 'react';
import './NewRig.scss';
import 'Utils/Form/Form.scss';
import SelectParts from '../../../SelectParts/SelectParts.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import { useForm } from 'Utils/hooks';
import Button from 'Utils/Form/Button/Button.jsx';
import { addStamp, addPartsToStamp } from 'Utils/RequestsAPI/Rigging/Stamp.jsx';
import { rigTypes } from '../../rigsVariables.js';
import { getRigsDefaultInputs } from '../../TableView/functions';

const NewRig = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(getRigsDefaultInputs(props.type));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    let itemId = 1;
    addStamp(formInputs)
      .then((res) => res.json())
      .then((res) => (itemId = res.id))
      .then(() =>
        Promise.all(
          formInputs.parts.map((item) =>
            addPartsToStamp({
              ...item,
              riggingId: itemId,
            }),
          ),
        ),
      )
      .then(() => props.history.push(rigTypes[props.type].redirectURL))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = `Создание ${rigTypes[props.type].name}`;
  }, [props.type]);

  return (
    <div className="new-rig">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Новый ${
              rigTypes[props.type].name
            }`}</div>
          </div>
          {errorWindow}
          <InputText
            inputName="Название оснастки(оборудования)"
            required
            error={formErrors.name}
            name="name"
            handleInputChange={({ target }) =>
              handleInputChange('name', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Артикул оснастки(оборудования)"
            required
            error={formErrors.number}
            name="number"
            handleInputChange={({ target }) =>
              handleInputChange('number', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Комментарий"
            name="comment"
            handleInputChange={({ target }) =>
              handleInputChange('comment', target.value)
            }
          />
          <SelectParts
            handlePartsChange={(parts) => handleInputChange('parts', parts)}
            error={formErrors.parts}
            hideError={() => setFormErrors({ ...formErrors, parts: false })}
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              className="main-form__submit main-form__submit--inverted"
              inverted
              onClick={() =>
                props.history.push(rigTypes[props.type].redirectURL)
              }
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
    </div>
  );
};

export default NewRig;
