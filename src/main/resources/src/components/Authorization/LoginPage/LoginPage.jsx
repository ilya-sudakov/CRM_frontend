import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './LoginPage.scss';
import { login, refreshToken } from '../../../utils/RequestsAPI/Authorization.jsx';
import profileSVG from '../../../../../../../assets/header/profile1.svg';
import companyLogo from '../../../../../../../assets/priceList/osfix_logo.png';
import PasswordIcon from '../../../../../../../assets/loginPage/password.png';
import eyeIcon from '../../../../../../../assets/loginPage/eye.png';
import ErrorMessage from '../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import exitSVG from '../../../../../../../assets/header/exit.svg';
import CheckBox from '../../../utils/Form/CheckBox/CheckBox.jsx';

const LoginPage = (props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberUser, setRememberUser] = useState(true);

    useEffect(() => {
        document.title = "Авторизация";
        if (localStorage.getItem("rememberUser")) {
            setRememberUser(localStorage.getItem("rememberUser"));
        }
        else {
            setRememberUser(true);
        }
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const loginRequest = Object.assign({
            username: username,
            password: password
        });
        login(loginRequest)
            .then(res => res.json())
            .then(response => {
                localStorage.setItem("rememberUser", rememberUser);
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
                        {/* <img className="authorization__img" src={profileSVG} alt="" /> */}
                        <img className="authorization__img authorization__img--logo" src={companyLogo} alt="" />
                        {/* <span>Авторизация</span> */}
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
                            <img className="authorization__img" src={profileSVG} alt="" />
                            <input type="text" onChange={e => setUserName(e.target.value)} placeholder="Введите логин..." defaultValue="" />
                        </div>
                        {/* <div className="authorization__field_name">
                            Пароль
                        </div> */}
                        <div className="authorization__field_input">
                            <img className="authorization__img authorization__img--eye" onClick={() => { setShowPassword(!showPassword) }} src={eyeIcon} alt="" />
                            <div className={showPassword ? "authorization__line" : "authorization__line authorization__line--hidden"} onClick={() => { setShowPassword(!showPassword) }} ></div>
                            <img className="authorization__img authorization__img--password" src={PasswordIcon} alt="" />
                            <input type={showPassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} placeholder="Введите пароль..." />
                        </div>
                        <CheckBox
                            text="Запомнить меня"
                            checked={rememberUser}
                            onChange={(value) => { setRememberUser(!rememberUser); }}
                        />
                        <button className="authorization__submit" onClick={handleLogin} >
                            <span>Войти</span>
                            <img className="authorization__img authorization__img--mirrored" src={exitSVG} alt="" />
                        </button>
                    </div>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <div className="authorization__title">
                            {/* <img className="authorization__img" src={profileSVG} alt="" /> */}
                            <img className="authorization__img authorization__img--logo" src={companyLogo} alt="" />
                            {/* <span>Выход из аккаунта</span> */}
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