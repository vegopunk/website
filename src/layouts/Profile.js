import React, {Component} from 'react'
import ProfilePanel from "../components/ProfilePanel";
import Preloader from "../components/Preloader";
import Header from "../components/Header";

class Profile extends Component {

    render() {
        return(
            <div id="container">
                <Preloader/>
                <Header firebase={this.props.firebase}/>
                <ProfilePanel firebase={this.props.firebase}/>
            </div>

        )
    }
}
export default Profile