import React, { Component } from 'react';

import '../styles/App.css';
// import $ from 'jquery'
// window.jQuery = $;
// window.$ = $;
require('bootstrap/dist/css/bootstrap.min.css')


class ProfilePanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {},
            verify: false
        }
    }

    componentDidMount() {
        const firebase = this.props.firebase;
        const dbRef = firebase.database().ref();
        const verifyEmailBtn = document.getElementById('verifyEmail');
        const newPasswordValue = document.getElementById('newPassword');
        const changePasswordBtn = document.getElementById('changePassword');

        verifyEmailBtn.addEventListener('click' , () => {
            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(function() {
                // Email sent.
                alert("A confirmation email was sent! Check your email.")
            }).catch(function(error) {
                // An error happened.
                alert("Error when sending email. Please, try a few moments later.")
            });
        });

        changePasswordBtn.addEventListener('click' , () => {
            var user = firebase.auth().currentUser;
            var newPassword = newPasswordValue.value;

            user.updatePassword(newPassword).then(function() {
                // Update successful.
                alert("Update successful.")
            }).catch(function(error) {
                // An error happened.
                alert("An error happened. Try later.")
            });
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dbRef.child("users").child(user.uid).on('value' , snap => {
                    this.setState({
                        user : snap.val()
                    })
                });
                if (user.emailVerified) {
                    this.setState({
                        verify: true
                    })
                }
            } else {
                window.location = "/"
            }
        });
    }

    render() {

        let verify;
        let verifyButton

        if (this.state.verify) {
            verify = <p style={{color: "green"}}>Подтвержден</p>
        } else {
            verify = <p style={{color: "red"}}>Не подтвержден</p>
            verifyButton = <div className="col-md-12"><button className="btn btn-box" id="verifyEmail">Подтвердить</button></div>
        }

        return (
            <div className="container main-container">
                <h1>{this.state.user.nickname}</h1>
                <div className="col-md-4" style={{border: "1px solid lightgray", marginBottom: "0px"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Почта:</h5>
                            <div className="input-contact" style={{marginBottom: "0px"}}>
                                <span>{this.state.user.email}</span>
                            </div>
                            {verify}
                            {verifyButton}
                        </div>
                        <div className="col-md-12">
                            <h5>Сменить пароль:</h5>
                            <div className="input-contact">
                                <input type="password" id="newPassword"/>
                                <span>Новый пароль</span>
                            </div>
                            <div className="col-md-12" style={{marginBottom: "8px"}}>
                                <button className="btn btn-box" id="changePassword">Изменить</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"/>
                <div className="col-md-6" style={{ height: "200px"}}>
                    <iframe frameBorder="0"
                            allowtransparency="true"
                            scrolling="no"
                            src="https://money.yandex.ru/embed/donate.xml?account=410015535963395&quickpay=donate&payment-type-choice=on&default-sum=&targets=%D0%94%D0%BB%D1%8F+%D1%83%D1%81%D0%BA%D0%BE%D1%80%D0%B5%D0%BD%D0%B8%D1%8F+%D0%B2%D1%8B%D1%85%D0%BE%D0%B4%D0%B0+%D0%BD%D0%BE%D0%B2%D1%8B%D1%85+%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE&target-visibility=on&project-name=&project-site=&button-text=05&comment=on&hint=%D0%A1%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%2C+%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BE%D0%B5+%D1%8F+%D1%82%D0%BE%D1%87%D0%BD%D0%BE+%D0%BF%D1%80%D0%BE%D1%87%D0%B8%D1%82%D0%B0%D1%8E.&successURL="
                            width="422"
                            height="160">
                    </iframe>
                </div>


            </div>
        );
    }
}

export default ProfilePanel;
