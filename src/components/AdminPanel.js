import React, { Component } from 'react';

import EditPanel from "../components/EditPanel";

import '../styles/App.css';
import $ from 'jquery'
window.jQuery = $;
window.$ = $;
require('bootstrap/dist/css/bootstrap.min.css')


class AdminPanel extends Component {

        render()
        {
            return (
                <div className="container main-container">
                    <h1>Admin panel</h1>

                    <EditPanel firebase={this.props.firebase} />
                    {/*<div className="col-md-6">*/}
                        {/*<h3>Information in database:</h3>*/}
                        {/*<pre>*/}
                        {/*{JSON.stringify(this.state.allVideosInCurrentCourse, null, 3)}*/}
                    {/*</pre>*/}
                    {/*</div>*/}


                </div>
            );
        }
    }


export default AdminPanel;
