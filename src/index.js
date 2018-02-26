import React from 'react';
import ReactDOM from 'react-dom';
require('bootstrap/dist/css/bootstrap.min.css')

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase";
import Auth from "./layouts/Auth"
import Main from "./layouts/Main";
import Admin from "./layouts/Admin";
import './index.css';
import Profile from "./layouts/Profile";
import CoursePage from "./layouts/CoursePage";
import SignUp from "./layouts/SignUp";
import ResetPassword from "./layouts/ResetPassword";

var config = {
    apiKey: "AIzaSyCba2whI1BceSZk3-0rshWXKNocAUik6qk",
    authDomain: "website-finally.firebaseapp.com",
    databaseURL: "https://website-finally.firebaseio.com",
    projectId: "website-finally",
    storageBucket: "website-finally.appspot.com",
    messagingSenderId: "789367552656"
};
firebase.initializeApp(config);


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" render={({match}) => <Main firebase={firebase}/>}/>
            <Route path="/auth" render={({match}) => <Auth firebase={firebase}/>}/>
            <Route path="/signup" render={({match}) => <SignUp firebase={firebase}/>}/>
            <Route path="/resetPassword" render={({match}) => <ResetPassword firebase={firebase}/>}/>
            <Route path="/profile" render={({match}) => <Profile firebase={firebase}/>}/>
            <Route path="/admin" render={({match}) => <Admin firebase={firebase}/>}/>
            <Route path="/course/:id" render={({match}) => <CoursePage firebase={firebase} uid={match.params.id}/>}/>
            <Redirect from='*' to='/'/>
        </Switch>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
