import React, {Component} from 'react'
import AuthPanel from "../components/AuthPanel";
import Preloader from "../components/Preloader";
import Header from "../components/Header";

class Auth extends Component {

    render() {
        return(
            <div id="container">
                <Preloader/>
                <Header firebase={this.props.firebase}/>
                <AuthPanel firebase={this.props.firebase}/>
            </div>

        )
    }
}
export default Auth