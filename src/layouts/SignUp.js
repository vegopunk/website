import React, {Component} from 'react'
import SignUpPanel from "../components/SignUpPanel";
import Preloader from "../components/Preloader";
import Header from "../components/Header";

class SignUp extends Component {

    render() {
        return(
            <div id="container">
                <Preloader/>
                <Header firebase={this.props.firebase}/>
                <SignUpPanel firebase={this.props.firebase}/>
            </div>

        )
    }
}
export default SignUp