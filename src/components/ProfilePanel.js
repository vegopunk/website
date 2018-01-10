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


            </div>
        );
    }
}

export default ProfilePanel;
