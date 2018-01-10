import React, {Component} from 'react'
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import AdminPanel from "../components/AdminPanel";

class Admin extends Component {

    constructor(){
        super();
        this.state = {
            admin: false
        }
    }


    componentWillMount() {
        const firebase = this.props.firebase;
        const dbRef = firebase.database().ref();
        const auth = firebase.auth();

        auth.onAuthStateChanged(user => {
            if (user) {
                dbRef.child("users").child(user.uid).on('value' , snap => {
                    console.log(snap.val());
                    let user = snap.val();
                    if (!user.status.admin) {
                        window.location = "/"
                    } else {
                        this.setState({
                            admin: true
                        })
                    }
                });
            } else {
                window.location = "/"
            }
        });
    }

    render() {

        var adminPanel;
        if (this.state.admin) {
            adminPanel = <AdminPanel firebase={this.props.firebase}/>
        }

        return(
            <div id="container">
                <Preloader/>
                <Header firebase={this.props.firebase}/>
                {adminPanel}
            </div>

        )
    }
}
export default Admin