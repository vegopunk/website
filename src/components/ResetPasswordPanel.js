import React, { Component } from 'react';

import '../styles/App.css';
// import $ from 'jquery'
// window.jQuery = $;
// window.$ = $;
require('bootstrap/dist/css/bootstrap.min.css')


class ResetPasswordPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {}
        }
    }

    componentDidMount() {
        const firebase = this.props.firebase;

        const sendEmailBtn = document.getElementById('sendEmail');

        //авторизация
        sendEmailBtn.addEventListener('click' , () => {
            var emailAddress = document.getElementById('email').value;
            var auth = firebase.auth();

            auth.sendPasswordResetEmail(emailAddress).then(function () {
                // Email sent.
                alert("Email sent.")
                window.location = "/auth"
            }).catch(function (error) {
                // An error happened.
                alert("An error happened. Try later.")
            });
        })
    }

    render() {

        return (
            <div className="container main-container">
                <div className="col-md-3"/>
                <div className="col-md-6" style={{border: "1px solid lightgray", marginBottom: "0px"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Почта:</h5>
                            <div className="input-contact" style={{marginBottom: "8px"}}>
                                <input type="email" id="email"/>
                            </div>
                            <div className="col-md-12" style={{marginBottom: "8px"}}>
                                <button className="btn btn-box" id="sendEmail">Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPasswordPanel;
