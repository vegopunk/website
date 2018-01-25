import React, {Component} from 'react'

import Intro from '../components/Intro'
import Header from '../components/Header'
import Preloader from '../components/Preloader'
import Content from '../components/Content'

class Main extends Component {

    render() {
        return(
            <div id="container">
                <Preloader />
                <Header firebase={this.props.firebase}/>
                <Intro/>
                <Content firebase={this.props.firebase}/>
            </div>

        )
    }
}
export default Main