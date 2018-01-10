import React, { Component } from 'react';

import EditPanel from "../components/EditPanel";

import '../styles/App.css';
import $ from 'jquery'
window.jQuery = $;
window.$ = $;
require('bootstrap/dist/css/bootstrap.min.css')


class AdminPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {foo: "123", foo2: "321321", foo3: "ldpqldlqp"},
            allCourses: [],
            allVideosInCurrentCourse: [],
            editor: []

        }
    }

        componentDidMount(){
            let firebase = this.props.firebase;
            let database = firebase.database().ref();
            let courses = [];

            //получение всех курсов из database
            database.child('courses').once('value', allCourses => {
                allCourses.forEach(function (childSnap) {
                    courses.push(childSnap)
                });
                this.setState({
                    allCourses: courses
                })
            });


            let selectCourses = document.getElementById('courses');
            // listener при выборе другого курса , и ререндер списка видео в курсе
            selectCourses.addEventListener("change", snap => {
                let videosArray = [];
                database.child("courses").child(selectCourses.value).child("videos").on('value', snap => {
                    snap.forEach(function (video) {
                        videosArray.push(video);
                    })
                    this.setState({
                        allVideosInCurrentCourse: videosArray
                    })
                })
            })

            let selectVideos = document.getElementById('videos');
            // listener при выборе другого курса , и ререндер списка видео в курсе
            selectVideos.addEventListener("change", snap => {
                let info = []

                if (selectVideos.value == "general" || selectVideos.value == "skills") {
                    database.child("courses").child(selectCourses.value).child(selectVideos.value).on('value', snap => {
                        snap.forEach(function (childInfo) {
                            info.push(childInfo)
                        });
                        this.setState({
                            editor: info
                        })
                    })
                } else {
                    database.child("courses").child(selectCourses.value).child("videos").child(selectVideos.value).on('value', snap => {
                        snap.forEach(function (childInfo) {
                            info.push(childInfo)
                        });
                        this.setState({
                            editor: snap
                        })
                    })
                }
            })
        }


        render()
        {
            var selectCourse = this.state.allCourses.map(course => <option key={course.key}>{course.key}</option>)
            var selectVideo = this.state.allVideosInCurrentCourse.map(video => <option
                key={video.key + 987654}>{video.key}</option>)
            var editor = this.state.editor.map(info => <input type="text" className="input-contact" key={info.key + 321312312} defaultValue={info.val()}/>)

            return (
                <div className="container main-container">
                    <h1>Admin panel</h1>

                    <div className="col-md-12">
                        <label htmlFor="courses">Course : </label>
                        <select name="courses" id="courses">
                            {selectCourse}
                        </select>

                        <label htmlFor="videos">Videos of course : </label>
                        <select name="videos" id="videos">
                            <option>general</option>
                            <option>skills</option>
                            {selectVideo}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <h3>Editor</h3>

                        {editor}

                    </div>
                    <div className="col-md-6">
                        <h3>Information in database:</h3>
                        <pre>
                        {JSON.stringify(this.state.allVideosInCurrentCourse, null, 3)}
                    </pre>
                    </div>


                </div>
            );
        }
    }


export default AdminPanel;
