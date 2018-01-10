import React, {Component} from 'react'

import Intro from '../components/Intro'
import Header from '../components/Header'
import Preloader from '../components/Preloader'
import $ from "jquery";

// const confirmPassword  = document.getElementById('confirmPassword');
// const loginButton  = document.getElementsByClassName('login');


class Main extends Component {

    render() {
        return(
            <div id="container">
                <Preloader />
                <Header firebase={this.props.firebase}/>
                <Intro/>
            </div>

        )
    }
}
export default Main