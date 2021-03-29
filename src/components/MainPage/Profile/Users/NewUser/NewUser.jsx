import { useEffect, useState } from 'react';
import './NewUser.scss';
import 'Utils/Form/Form.scss';
import { addUser } from 'Utils/RequestsAPI/Users.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import { useForm } from 'Utils/hooks';
import { usersDefaultInputs } from '../objects';

const NewUser = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm([
    ...usersDefaultInputs,
    {
      name: 'role',
      defaultValue: 'ROLE_ADMIN',
      isRequired: true,
      isValid: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    console.log(formInputs);
    addUser(formInputs)
      .then(() => props.history.push('/profile/users'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Создание пользователя';
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Создание пользователя</div>
        </div>
        {errorWindow}
        <InputText
          inputName="Имя пользователя"
          required
          error={formErrors.username}
          name="username"
          handleInputChange={({ target }) =>
            handleInputChange('username', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputText
          inputName="Пароль"
          required
          error={formErrors.password}
          name="password"
          handleInputChange={({ target }) =>
            handleInputChange('password', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputText
          inputName="Эл. почта"
          required
          error={formErrors.email}
          name="email"
          handleInputChange={({ target }) =>
            handleInputChange('email', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Роль</div>
          <div className="main-form__input_field">
            <select
              onChange={({ target }) => handleInputChange('role', target.value)}
            >
              <option value="ROLE_ADMIN">Руководитель</option>
              <option value="ROLE_MANAGER">Менеджер1</option>
              <option value="ROLE_LEPSARI">Цех Лепсари</option>
              <option value="ROLE_LEMZ">Цех ЛЭМЗ</option>
              <option value="ROLE_LIGOVSKIY">Цех Лиговский</option>
              <option value="ROLE_DISPATCHER">Диспетчер</option>
              <option value="ROLE_ENGINEER">Инженер</option>
            </select>
          </div>
        </div>
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <Button
            className="main-form__submit main-form__submit--inverted"
            inverted
            onClick={() => props.history.push('/profile/users')}
            text="Вернуться назад"
          />
          <Button
            text="Добавить пользователя"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default NewUser;
