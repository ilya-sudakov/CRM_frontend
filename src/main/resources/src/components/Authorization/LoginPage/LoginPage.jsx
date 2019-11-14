import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './LoginPage.scss';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = "Вход в аккаунт";
    });

    const handleLogin = (event) => {
        event.preventDefault();
        if (email === "test@mail.ru" && password === "password") {
            const userData = Object.assign({
                email: email
            });
            localStorage.setItem("email", email);
            props.setUserData(true, userData);

            props.history.push('/requests');
        }
        else {
            alert("Введены некорректные данные");
        }
    }

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.removeItem("email");
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
                            <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Введите email..." defaultValue="" />
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
                            Вы уже авторизованы!
                        </div>
                        <div className="authorization__panel">
                            <div className="authorization__submit">
                                <input type="submit" onClick={handleSignOut} value="Выйти" />
                            </div>
                            <div className="authorization__link">
                                Нажмите
                                <Link to="/requests">здесь</Link>
                                чтобы вернуться на главную страницу
                            </div>
                        </div>
                    </React.Fragment>
                )}
        </div>
    );
}

export default LoginPage;