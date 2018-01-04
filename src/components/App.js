import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';


// import $ from 'jquery'
// window.jQuery = $;
// window.$ = $;
require('bootstrap/dist/css/bootstrap.min.css')


class App extends Component {
  render() {
    return (
        <div id="container">
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
                {/*<div className="col-md-6" style={{marginTop: "60px"}}>*/}
                {/*<Link to="/" className="btn btn-box" id="quit" >Выйти</Link>*/}
                {/*</div>*/}

            </div>
        </div>
    );
  }
}

export default App;
