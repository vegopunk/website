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
            user : {}
        }
    }

    componentDidMount() {
        const firebase = this.props.firebase;
        const dbRef = firebase.database().ref();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dbRef.child("users").child(user.uid).on('value' , snap => {
                    this.setState({
                        user : snap.val()
                    })
                });
            } else {
                window.location = "/"
            }
        });
    }

    render() {
        return (
            <div className="container main-container">
                <h1>{this.state.user.nickname}</h1>
                <div className="col-md-4" style={{border: "1px solid lightgray"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Email:</h5>
                            <div className="input-contact">
                                <span>{this.state.user.email}</span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <h5>Password:</h5>
                            <div className="input-contact">
                                <span>{this.state.user.pass}</span>
                            </div>
                        </div>
                    </div>
                </div>
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
