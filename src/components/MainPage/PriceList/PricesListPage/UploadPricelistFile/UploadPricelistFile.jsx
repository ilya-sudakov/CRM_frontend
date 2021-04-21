import { useState } from 'react';
import FileUploader from 'Components/Form/FileUploader/FileUploader.jsx';
import Button from 'Components/Form/Button/Button.jsx';
import { createPricelist } from 'API/Clients/price_list.js';
import { createFormDataFromObject } from 'Utils/functions.jsx';
import { useForm } from 'Utils/hooks';
import { useHistory } from 'react-router';

const UploadPricelistFile = () => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    formIsValid,
    hideError,
    errorWindow,
  } = useForm([{ name: 'files', defaultValue: [], isRequired: true }]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    createPricelist(createFormDataFromObject({ files: formInputs.files }))
      .then(() => history.push('/price-list'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="main-form">
        <form className="main-form__form">
          {errorWindow}
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Загрузка файла</div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Прайс*</div>
            <FileUploader
              onChange={(result) => handleInputChange('files', result)}
              defaultValue={formInputs.files}
              regex={/.+\.(xlsx|csv)/}
              error={formErrors.files}
              hideError={() => hideError('files')}
            />
          </div>
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              text="Вернуться назад"
              inverted
              className="main-form__submit main-form__submit--inverted"
              onClick={() => history.push('/price-list')}
            />
            <Button
              text="Сохранить файл"
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

export default UploadPricelistFile;
