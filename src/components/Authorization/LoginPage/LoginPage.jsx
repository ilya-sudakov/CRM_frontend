import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.scss';
import 'Utils/MainWindow/MainWindow.scss';
import { login } from 'Utils/RequestsAPI/Authorization.js';
import eyeIcon from '../../../../assets/loginPage/eye.png';
import companylogo from '../../../../assets/loginPage/login-page_logo.png';
import ErrorMessage from 'Utils/Form/ErrorMessage/ErrorMessage.jsx';
import exitSVG from '../../../../assets/header/exit.svg';
import CheckBox from 'Utils/Form/CheckBox/CheckBox.jsx';
import Button from 'Utils/Form/Button/Button.jsx';

const LoginPage = (props) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberUser, setRememberUser] = useState(true);
  const [hide, setHide] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    document.title = 'Авторизация';
    if (localStorage.getItem('rememberUser')) {
      setRememberUser(localStorage.getItem('rememberUser'));
    } else {
      setRememberUser(true);
    }
  }, []);

  useEffect(() => {
    console.log(showError);
  }, [showError, setShowError]);

  const handleLogin = () => {
    // event.preventDefault();
    setIsLoading(true);
    const loginRequest = Object.assign({
      username: username,
      password: password,
    });
    login(loginRequest)
      .then((res) => res.json())
      .then((response) => {
        setIsLoading(false);
        localStorage.setItem('rememberUser', rememberUser);
        props.setUserData(true, response);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    props.setUserData(false, null);
  };

  const handleAutoFill = (e) => {
    setHide(e.animationName === 'onAutoFillStart');
  };

  const isFocused = username !== '' || password !== '' || hide || focus;

  return (
    <div className="authorization">
      <div className="authorization__background">
        <div className="authorization__circle authorization__circle--1"></div>
        <div className="authorization__circle authorization__circle--2"></div>
        <div className="authorization__circle authorization__circle--3"></div>
      </div>
      <div className="main-window">
        {!props.isAuthorized ? (
          <div className="authorization__panel">
            <div className="authorization__title">
              <img
                className="authorization__img authorization__img--logo"
                src={companylogo}
                alt=""
              />
              {/* <div className="authorization__title-text">Вход в аккаунт</div> */}
            </div>
            <ErrorMessage
              message="Ошибка при авторизации"
              showError={showError}
              setShowError={setShowError}
            />
            <div className="authorization__field_input">
              <div
                className={`authorization__field_name ${
                  isFocused ? 'authorization__field_name--focused' : ''
                }`}
              >
                Логин
              </div>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                onAnimationStart={handleAutoFill}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                id="login"
                autoComplete="on"
                defaultValue=""
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
            </div>
            <div className="authorization__field_input">
              <div
                className={`authorization__field_name  ${
                  isFocused ? 'authorization__field_name--focused' : ''
                }`}
              >
                Пароль
              </div>
              <img
                className="authorization__img authorization__img--eye"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                src={eyeIcon}
                alt=""
              />
              <div
                className={
                  showPassword
                    ? 'authorization__line'
                    : 'authorization__line authorization__line--hidden'
                }
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              ></div>
              <input
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
                id="password"
                onAnimationStart={handleAutoFill}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onKeyDown={(event) => event.key === 'Enter' && handleLogin()}
              />
            </div>
            <CheckBox
              text="Запомнить меня"
              checked={rememberUser}
              onChange={() => {
                setRememberUser(!rememberUser);
              }}
            />
            <Button
              text="Войти"
              imgSrc={exitSVG}
              type="submit"
              className="main-window__button"
              isLoading={isLoading}
              onClick={handleLogin}
            />
          </div>
        ) : (
          <div className="authorization__panel">
            <div className="authorization__title">
              <img
                className="authorization__img authorization__img--logo"
                src={companylogo}
                alt=""
              />
            </div>
            <Button
              text="Выйти"
              imgSrc={exitSVG}
              type="submit"
              className="main-window__button"
              isLoading={isLoading}
              onClick={handleSignOut}
            />
            <div className="authorization__link">
              Нажмите
              <Link to="/">здесь</Link>
              чтобы вернуться на главную страницу
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
