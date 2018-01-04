import React, {Component} from 'react'

import Intro from '../components/Intro'
import $ from "jquery";

// const confirmPassword  = document.getElementById('confirmPassword');
// const loginButton  = document.getElementsByClassName('login');


class Main extends Component {

    render() {
        return(
            <div id="container">
                <Intro/>
            </div>

        )
    }
}
export default Main