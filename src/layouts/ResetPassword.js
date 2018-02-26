import React, {Component} from 'react'
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import ResetPasswordPanel from "../components/ResetPasswordPanel";

class ResetPassword extends Component {

    render() {
        return(
            <div id="container">
                <Preloader/>
                <Header firebase={this.props.firebase}/>
                <ResetPasswordPanel firebase={this.props.firebase}/>
            </div>

        )
    }
}
export default ResetPassword