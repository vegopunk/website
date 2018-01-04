import React, {Component} from 'react'
import AuthPanel from "../components/AuthPanel";

class Auth extends Component {

    render() {
        return(
            <div id="container">
                {/*<Preloader/>*/}
                <AuthPanel firebase={this.props.firebase}/>
            </div>

        )
    }
}
export default Auth