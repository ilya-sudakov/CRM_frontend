import React, { useState, useEffect } from 'react';
import './NewLtd.scss';
import Button from '../../../../../../utils/Form/Button/Button.jsx';
import { addLTD } from '../../../../../../utils/RequestsAPI/PriceList/lts_list.js';
import FileUploader from '../../../../../../utils/Form/FileUploader/FileUploader.jsx';
import { fetchINNData, getInputsListFromArray } from '../functions';
import {
  ltdFormNameInputs,
  ltdListDefaultInputs,
  ltdFormAddressInputs,
  ltdFormContactsInputs,
  ltdFormBankInputs,
  ltdFormEmployeesInputs,
} from '../objects.js';
import useForm from '../../../../../../utils/hooks/useForm.js';

const NewLtd = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    updateFormInputs,
    errorWindow,
  } = useForm(ltdListDefaultInputs);

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    console.log(formInputs);
    if (!formIsValid()) return;
    setIsLoading(true);
    addLTD(formInputs)
      .then(() => props.history.push('/ltd-list'))
      .catch(() => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
      });
  };

  useEffect(() => {
    document.title = 'Добавление ООО';
  }, []);

  const allOtherInputs = [
    { name: 'inn', inputName: 'ИНН', required: true },
    {
      custom: (
        <Button
          text="Загрузить данные по ИНН"
          className="main-window__button main-window__button--inverted"
          inverted
          onClick={() =>
            fetchINNData(formInputs, setIsLoading, updateFormInputs)
          }
          isLoading={isLoading}
          style={{ margin: '-15px auto 20px 10px' }}
        />
      ),
    },
    { name: 'kpp', inputName: 'КПП', required: true },
    { name: 'ogrn', inputName: 'ОГРН', required: true },
    { name: 'okpo', inputName: 'ОКПО', required: true },
    { name: 'okved', inputName: 'ОКВЭД', required: true },
    { name: 'okpo', inputName: 'ОКПО', required: true },
    { name: 'okpo', inputName: 'ОКПО', required: true },
  ];

  const defaultInputsListParams = [
    { formErrors: formErrors, setFormErrors: setFormErrors },
    { formInputs: formInputs, handleInputChange: handleInputChange },
  ];

  return (
    <div className="new-ltd">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Добавление ООО</div>
          </div>
          {errorWindow}
          {getInputsListFromArray(
            ltdFormNameInputs,
            ...defaultInputsListParams,
          )}
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Адреса</div>
            <div className="main-form__group-content">
              {getInputsListFromArray(
                ltdFormAddressInputs,
                ...defaultInputsListParams,
              )}
            </div>
          </div>
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Контактные данные</div>
            <div className="main-form__group-content">
              {getInputsListFromArray(
                ltdFormContactsInputs,
                ...defaultInputsListParams,
              )}
            </div>
          </div>
          {getInputsListFromArray(allOtherInputs, ...defaultInputsListParams)}
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Банковская информация</div>
            {getInputsListFromArray(
              ltdFormBankInputs,
              ...defaultInputsListParams,
            )}
          </div>
          {getInputsListFromArray(
            ltdFormEmployeesInputs,
            ...defaultInputsListParams,
          )}
          <div className="main-form__item">
            <div className="main-form__input_name">Лого*</div>
            <FileUploader
              previewImage={formInputs.logo}
              error={formErrors.logo}
              onChange={(value) => handleInputChange('logo', value)}
              hideError={() => setFormErrors({ ...formErrors, logo: false })}
            />
          </div>
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              inverted
              isLoading={isLoading}
              className="main-form__submit main-form__submit--inverted"
              onClick={() => props.history.push('/ltd-list')}
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
export default NewLtd;
