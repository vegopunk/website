import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'
import '../styles/App.css';
// import $ from 'jquery'
// window.jQuery = $;
// window.$ = $;
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
        const dbRef = firebase.database().ref();
        const loginBtn = document.getElementById('loginBtn');
        const signUpBtn = document.getElementById('signUpBtn');
        const quit = document.getElementById('quit');

        quit.addEventListener('click' , () => {
            firebase.auth().signOut();
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dbRef.child("users").child(user.uid).child("nickname").on('value' , snap => {
                    console.log(snap.val())
                });
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
                .then(function () {
                    // window.location = "/";
                    console.log("Success login")
                })
                .catch(function (error) {
                    console.log(error)
                });


            console.log(email + " : " + password)
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
                        console.log("successtully create user: ", user.uid);

                        let object = new Object();

                        let uid = user.uid;
                        let dictionaryValues = {email : email , pass : password, nickname: nickname};
                        object[uid] = dictionaryValues;

                        firebase.database().ref().child('users').update(object)
                            .then(function () {
                                console.log("Successfully saved user info to db")
                                // window.location = "/"
                            })
                            .catch(function (error) {
                                console.log("Failed to save user info into db",error)
                            })
                    })
                    .catch(function (error) {
                        // console.log(error)
                        alert(error.message)
                    });
            }
            console.log(email + " : " + password)
        });
    }

    render() {
        return (
                <div className="container main-container">

                    <div className="col-md-6" >
                        <div>
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
                                </div>
                                <div className="col-md-12">
                                    <button className="btn btn-box" id="loginBtn">Log In</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6" >
                        {/*<h3 className="text-uppercase">contact me</h3>*/}
                        {/*<h5>Creative & Lorem ipsum dolor sit amet</h5>*/}
                        {/*<div className="h-30"></div>*/}
                        {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliter enim nosmet ipsos nosse non possumus. Inscite autem medicinae et gubernationis ultimum cum ultimo sapientiae comparatur. Tecum optime, deinde etiam cum mediocri amico. Et nemo nimium beatus est; Ac ne plura complectar-sunt enim innumerabilia-, bene laudata virtus voluptatis aditus </p>*/}
                        {/*<div className="contact-info">*/}
                        {/*<p><i className="ion-android-call"></i> 0100 787 3456</p>*/}
                        {/*<p><i className="ion-ios-email"></i> box@info.com</p>*/}
                        {/*</div>*/}
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-contact">
                                        <input type="text" id="signUpNickname" placeholder="nickname"/>
                                        {/*<span>nickname</span>*/}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-contact">
                                        <input type="email" id="signUpEmail" placeholder="email"/>
                                        {/*<span>email</span>*/}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-contact">
                                        <input type="password" id="signUpPassword" placeholder="password"/>
                                        {/*<span>password</span>*/}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-contact">
                                        <input type="password" id="signUpConfirmPassword" placeholder="confirm password"/>
                                        {/*<span>password</span>*/}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn btn-box signup" id="signUpBtn">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6" style={{marginTop: "60px"}}>
                        <a className="btn btn-box" >На главную</a>
                    </div>
                    <div className="col-md-6" style={{marginTop: "60px"}}>
                    <Link to="/" className="btn btn-box" id="quit" >Выйти</Link>
                    </div>

                </div>
        );
    }
}

export default AuthPanel;
