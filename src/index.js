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
import './index.css';

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
            {/*<Redirect from='*' to='/'/>*/}
        </Switch>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
