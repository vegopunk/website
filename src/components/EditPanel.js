import React, { Component } from 'react';

import '../styles/App.css';
import $ from 'jquery'
window.jQuery = $;
window.$ = $;
require('bootstrap/dist/css/bootstrap.min.css')

class EditPanel extends Component {

    render() {
        return (
            <h1> Панель редактирования </h1>
        )
    }

}


export default EditPanel;