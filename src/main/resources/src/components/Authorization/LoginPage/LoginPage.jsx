import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './LoginPage.scss';
import { login, refreshToken } from '../../../utils/RequestsAPI/Authorization.jsx';
import profileSVG from '../../../../../../../assets/header/profile1.svg';
import ErrorMessage from '../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import exitSVG from '../../../../../../../assets/header/exit.svg';

const LoginPage = (props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Авторизация";
    });

    const handleLogin = (event) => {
        event.preventDefault();
        const loginRequest = Object.assign({
            username: username,
            password: password
        });
        login(loginRequest)
            .then(res => res.json())
            .then(response => {
                props.setUserData(true, response.user);
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                setShowError(true);
            })
    }

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        props.setUserData(false, null);
    }

    return (
        <div className="authorization">
            {!props.isAuthorized ? (
                <React.Fragment>
                    <div className="authorization__title">
                        <img className="authorization__img" src={profileSVG} alt="" />
                        <span>Авторизация</span>
                    </div>
                    <div className="authorization__panel">
                        <ErrorMessage
                            message="Ошибка при авторизации"
                            showError={showError}
                            setShowError={setShowError}
                        />
                        {/* <div className="authorization__field_name">
                            Email
                        </div> */}
                        <div className="authorization__field_input">
                            <input type="text" onChange={e => setUserName(e.target.value)} placeholder="Введите логин..." defaultValue="" />
                        </div>
                        {/* <div className="authorization__field_name">
                            Пароль
                        </div> */}
                        <div className="authorization__field_input">
                            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Введите пароль..." />
                        </div>
                        <button className="authorization__submit" onClick={handleLogin} >
                            <span>Войти</span>
                            <img className="authorization__img authorization__img--mirrored" src={exitSVG} alt="" />
                        </button>
                    </div>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <div className="authorization__title">
                            <img className="authorization__img" src={profileSVG} alt="" />
                            <span>Выход из аккаунта</span>
                        </div>
                        <div className="authorization__panel">
                            <button className="authorization__submit" onClick={handleSignOut}>
                                <span>Выйти</span>
                                <img className="authorization__img" src={exitSVG} alt="" />
                            </button>
                            <div className="authorization__link">
                                Нажмите
                                <Link to="/">здесь</Link>
                                чтобы вернуться на главную страницу
                            </div>
                        </div>
                    </React.Fragment>
                )}
        </div>
    );
}

export default LoginPage;