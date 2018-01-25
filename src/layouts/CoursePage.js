import React, {Component} from 'react'
import Header from '../components/Header'
import CourseContent from '../components/CourseContent'
import Preloader from '../components/Preloader'

class CoursePage extends Component {

    render() {
        return(
            <div id="container">
                <Preloader/>
                <Header firebase={this.props.firebase}/>
                <CourseContent firebase={this.props.firebase} uid={this.props.uid}/>
                {/*<Footer/>*/}
            </div>

        )
    }
}

export default CoursePage