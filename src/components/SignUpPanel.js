import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../styles/App.css';
require('bootstrap/dist/css/bootstrap.min.css')



class SignUpPanel extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount(){

        const firebase = this.props.firebase;
        // const dbRef = firebase.database().ref();
        // const loginBtn = document.getElementById('loginBtn');
        const signUpBtn = document.getElementById('signUpBtn');

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.location = "/";
            } else {
                console.log("pls login man")
            }
        });

        //регистрация
        signUpBtn.addEventListener('click' , () => {
            let firebase = this.props.firebase;
            const nickname = document.getElementById('signUpNickname').value;
            const email = document.getElementById('signUpEmail').value;
            const password = document.getElementById('signUpPassword').value;
            const confirmPassword = document.getElementById('signUpConfirmPassword').value;
            const auth = firebase.auth();


            if (password === confirmPassword) {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(function (user) {
                        let object = new Object();

                        let uid = user.uid;
                        let status = {user : true};
                        let dictionaryValues = {email : email, nickname: nickname };
                        object[uid] = dictionaryValues;
                        object[uid]["status"] = status;

                        firebase.database().ref().child('users').update(object)
                            .then(function () {
                                window.location = "/auth"
                            })
                            .catch(function (error) {
                                alert("Failed to save user info into database")
                            })
                    })
                    .catch(function (error) {
                        alert(error.message)
                    });
            } else {
                alert("Пароли не совпадают!")
            }
        });
    }


    render() {
        return(
            <div className="container main-container">
                <div className="col-md-3" />

                <div className="col-md-6" >
                    <div>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="input-contact">
                                    <input type="text" id="signUpNickname" placeholder="nickname"/>
                                    {/*<span>nickname</span>*/}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="input-contact">
                                    <input type="email" id="signUpEmail" placeholder="email"/>
                                    {/*<span>email</span>*/}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="input-contact">
                                    <input type="password" id="signUpPassword" placeholder="password"/>
                                    {/*<span>password</span>*/}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="input-contact">
                                    <input type="password" id="signUpConfirmPassword" placeholder="confirm password"/>
                                    {/*<span>password</span>*/}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="btn btn-box signup" id="signUpBtn">Зарегистрироваться</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


}


export default SignUpPanel;