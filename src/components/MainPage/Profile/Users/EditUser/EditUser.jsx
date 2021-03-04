import { useEffect, useState } from 'react';
import './EditUser.scss';
import 'Utils/Form/Form.scss';
import { getUserById, editUser } from 'Utils/RequestsAPI/Users.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import useForm from 'Utils/hooks/useForm';
import { usersDefaultInputs } from '../objects';

const EditUser = (props) => {
  const [userId, setUserId] = useState(1);
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    updateFormInputs,
    formIsValid,
    errorWindow,
  } = useForm(usersDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    editUser(formInputs, userId)
      .then(() => {
        props.history.push('/profile/users');
        document.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Редактирование пользователя';
    const id = props.history.location.pathname.split('/profile/users/edit/')[1];
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!');
      props.history.push('/profile/users');
    } else {
      setUserId(id);
      getUserById(id)
        .then((res) => res.json())
        .then((oldUser) => {
          updateFormInputs({
            username: oldUser.username,
            email: oldUser.email,
          });
        })
        .catch((error) => {
          console.log(error);
          alert('Неправильный индекс заявки!');
          props.history.push('/profile/users');
        });
    }
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование пользователя</div>
        </div>
        {errorWindow}
        <InputText
          inputName="Имя пользователя"
          required
          error={formErrors.username}
          defaultValue={formInputs.username}
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
          defaultValue={formInputs.email}
          name="email"
          handleInputChange={({ target }) =>
            handleInputChange('email', target.value)
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
            onClick={() => props.history.push('/profile/users')}
            text="Вернуться назад"
          />
          <Button
            text="Обновить данные"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
