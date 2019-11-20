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
        if (localStorage.getItem("refreshToken")) {
            const refreshTokenObject = Object.assign({
                refreshToken: localStorage.getItem("refreshToken")
            })
            refreshToken(refreshTokenObject)
                .then(res => res.json())
                .then((response) => {
                    // console.log(response);
                    props.setUserData(true, response.user);
                    localStorage.setItem("accessToken", response.accessToken);
                    localStorage.setItem("refreshToken", response.refreshToken);
                    // login(loginRequest)
                    //   .then(res => res.json())
                    //   .then(response => {
                    //     this.setUserData(true, response.user);
                    //     localStorage.setItem("accessToken", response.accessToken);
                    //     localStorage.setItem("refreshToken", response.refreshToken);
                    //   })
                })
                .catch((error) => {
                    console.log(error);
                    // console.log(this.state);
                    // this.props.history.push("/login");
                })
            // refreshToken(refreshTokenObject)
            // .then(() => {
            // login(loginRequest)
            //     .then(res => res.json())
            //     .then(response => {
            //         props.setUserData(true, response.user);
            //         localStorage.setItem("accessToken", response.accessToken);
            //         localStorage.setItem("refreshToken", response.refreshToken);
            //         localStorage.setItem("username", response.user.username);
            //         props.history.push('/requests');
            //     })
            //     // })
            //     .catch((error) => {
            //         console.log(error);
            //     })
        }
        else {
            login(loginRequest)
                .then(res => res.json())
                .then(response => {
                    props.setUserData(true, response.user);
                    localStorage.setItem("accessToken", response.accessToken);
                    localStorage.setItem("refreshToken", response.refreshToken);
                    // localStorage.setItem("username", response.user.username)
                    props.history.push('/requests');
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        //Для тестов
        // if (email === "test@mail.ru" && password === "password") {
        //     const userData = Object.assign({
        //         email: email,
        //         name: 'Иван Иванов'
        //     });
        //     localStorage.setItem("email", email);
        //     props.setUserData(true, userData);

        //     props.history.push('/requests');
        // }
        // else {
        //     alert("Введены некорректные данные");
        // }
    }

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");
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