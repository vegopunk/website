/**
 * Created by vegopunk on 22.12.2017.
 */
import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
const bootstrap = require('bootstrap');
import Skills from "./Skills";
import '../styles/CourseContent.css';

class CourseContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            courseCategories: [],
            skills: [],
            courseVideos: [],
            currentVideo: "",
            auth: false,
            status: false,
            links: []
        };
    }

    componentDidMount() {

        let firebase = this.props.firebase;

        firebase.database().ref("/titles/links").on("value" , snap => {
            let links = [];
            snap.forEach(function (link) {
                links.push(link)
            })
            this.setState({
                links: links
            })
        })



        const dbRefCourses = firebase.database().ref("/courses").child(this.props.uid);
        let courseVideos = [];
        dbRefCourses.once('value', course => {
            let description = course.val().general;
            let categories = course.val();
            let videos = course.val().videos;
            Object.keys(videos).forEach(function (key) {
                courseVideos.push(videos[key])
            })
            this.setState({
                title: description.title,
                description: description.description,
                skills: categories.skills,
                category: description.category,
                courseVideos : courseVideos,
                currentVideo: description.preview
            })
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    auth: true
                })
            } else {
                this.setState({
                    auth: false
                })
            }
        });

    }

    render() {
        var courseVideos;
        var buy;
        var skills = <Skills skills={this.state.skills}/>


        if (this.state.auth) {
            courseVideos = <div className="col-md-12" style={{
                border : "1px solid black",
                height: "168px",
                overflowY: "hidden",
                margin: "0",
                padding: "0",
                width: "100%",
                whiteSpace: "nowrap",
                overflowX: "auto"
            }}>
                {this.state.courseVideos.map((video, index) => {
                    return <div key={index + 2} style={{
                        display: "inline-block",
                        float: "none",
                        marginLeft: "8px",
                        marginRight: "8px",
                        marginTop: "8px"
                    }}>
                        <img onClick={e => this.setState({currentVideo: video.link, description: video.description , sourceLink: video.sourceLink})} style={{cursor: "pointer",height : "150px"}} src={video.imageUrl}/>
                    </div>
                })
                }
            </div>
            buy = <a href={this.state.sourceLink} className="btn btn-box" style={{marginTop: "20px"}} >Материалы</a>
        } else{
            buy = <Link to="/auth" className="btn btn-box" >Посмотреть курс</Link>
        }

        return (
            <div className="container main-container" >
                <div className="container">

                    <div className="col-md-12" className="iframe-container">
                            <iframe
                                src={this.state.currentVideo}
                                // width="1920"
                                // height="1080"
                                frameBorder="0"
                                webkitallowfullscreen="true"
                                mozallowfullscreen="true"
                                allowFullScreen
                            >
                            </iframe>
                            <div className="h-30"></div>
                        </div>


                    {courseVideos}


                    <div className="col-md-9">
                        <h3 className="text-uppercase">{this.state.title}</h3>
                        <h5>{this.state.category}</h5>
                        <div className="h-30"></div>
                    </div>

                    {buy}

                    <div className="col-md-9" style={{wordBreak: "break-all"}}>
                        <p>{this.state.description}</p>
                    </div>

                    <div className="col-md-3">
                        {skills}

                        <div className="h-10"></div>
                        <h4>Подписывайся в :</h4>
                        <ul className="social-ul">
                            {this.state.links.map(link => <li key={link.key} className="box-social"><a target="_blank" style={{color: "#9a9a9a"}} href={link.val()}>{link.key}</a></li>)}
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}


export default CourseContent

