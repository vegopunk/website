import React , {Component} from 'react'
import '../styles/Preloader.css';

import $ from "jquery"

function preloader() {
    $('#status').fadeOut(); // will first fade out the loading animation

    $('#preloader').delay(650).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
}

class Preloader extends Component{

    componentDidMount() {
        preloader()
    }


    render(){
        return(
            <div id="preloader">
                <div className="pre-container">
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preloader