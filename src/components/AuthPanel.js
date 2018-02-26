import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../styles/App.css';
require('bootstrap/dist/css/bootstrap.min.css')


class AuthPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            caption : ''
        }
    }

    componentDidMount() {
        const firebase = this.props.firebase;
        const loginBtn = document.getElementById('loginBtn');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                    window.location = "/";
            } else {
                console.log("pls login man")
            }
        });



        //авторизация
        loginBtn.addEventListener('click' , () => {
            let firebase = this.props.firebase;
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const auth = firebase.auth();

            auth.signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    alert("Ошибка на сервере при авторизации! Пожалуйста, попробуйте чуть позже или сообщите нам об этой ошибке!")
                });
        });


    }

    render() {
        return (
                <div className="container main-container" >
                    <div className="col-md-3"/>

                    <div className="col-md-6" >
                        <div >
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="input-contact">
                                        <input type="email" id="loginEmail" placeholder="email"/>
                                        {/*<span>email</span>*/}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="input-contact">
                                        <input type="password" id="loginPassword" placeholder="password"/>
                                        {/*<span>password</span>*/}
                                    </div>
                                    <p style={{marginBottom: "2px"}}>Нет аккаунта? <Link to="/signup" >Зарегистрируйтесь!</Link></p>
                                    <p style={{marginBottom: "2px"}}><Link to="/resetPassword" >Забыли пароль?</Link></p>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn btn-box" id="loginBtn">Войти</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default AuthPanel;
