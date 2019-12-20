import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './LoginPage.scss';
import { login, refreshToken } from '../../../utils/utilsAPI.jsx';

const LoginPage = (props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

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
                        Авторизация
                    </div>
                    <div className="authorization__panel">
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
                        <div className="authorization__submit">
                            <input type="submit" onClick={handleLogin} value="Войти" />
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <div className="authorization__title">
                            Выход из аккаунта
                        </div>
                        <div className="authorization__panel">
                            <div className="authorization__submit">
                                <input type="submit" onClick={handleSignOut} value="Выйти" />
                            </div>
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