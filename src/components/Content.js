import React , {Component} from "react"


import ContentElement from "./ContentElement"
import '../styles/ContentElement.css';

class Content extends Component {

    constructor(props){
        super(props);

        this.state = {
            courses: []
        };
    }

    componentWillMount(){
        let firebase = this.props.firebase;
        const dbRefCourses = firebase.database().ref("/courses");
        //получаем все курса из database
        dbRefCourses.on('value' , allCourses => {
            var courses = [];
            allCourses.forEach(function (course) {
                courses.push(course)
            });
            this.setState({
                courses: courses
            })
        });
    }

    render(){
        return(
            <div className="portfolio-div">
                <div className="portfolio">
                    <div className="no-padding portfolio_container">
                        {this.state.courses.map((courseInfo, index) =>
                            <ContentElement key={ index + 4 } course={courseInfo}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Content