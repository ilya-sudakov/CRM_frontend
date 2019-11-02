import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './LoginPage.scss';

const LoginPage = (props) => {
    const [email, setEmail] = useState({
        email: '',
    });
    const [password, setPassword] = useState({
        password: '',
    });

    useEffect(() => {
        document.title = "Вход в аккаунт";
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
    }

    // if (props.isAuthorized) {
    //     return <Redirect to={{
    //         pathname: '/',
    //         state: { from: props.location }
    //     }} />
    // }

    return (
        <div className="authorization">
            {!props.isAuthorized ? (
                <React.Fragment>
                    <div className="authorization__title">
                        Вход в аккаунт
                    </div>
                    <div className="authorization__panel">
                        <div className="authorization__field_name">
                            Почта
                        </div>
                        <div className="authorization__field_input">
                            <input type="text" onChange={e => setEmail({ email: e.target.value })} />
                        </div>
                        <div className="authorization__field_name">
                            Пароль
                        </div>
                        <div className="authorization__field_input">
                            <input type="text" onChange={e => setPassword({ password: e.target.value })} />
                        </div>
                        <div className="authorization__submit">
                            <input type="submit" onClick={handleSubmit} value="Войти" />
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <div className="authorization__title">
                            Вы уже авторизованы
                        </div>
                        <div className="authorization__panel">
                            <div className="authorization__submit">
                                <input type="submit" onClick={handleSubmit} value="Выйти" />
                            </div>
                        </div>
                    </React.Fragment>
                )}
        </div>
    );
}

export default LoginPage;