import React, { Component } from 'react';

import '../styles/App.css';
import $ from 'jquery'
window.jQuery = $;
window.$ = $;
require('bootstrap/dist/css/bootstrap.min.css')


class EditPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {foo: "123", foo2: "321321", foo3: "ldpqldlqp"},
            allCourses: [],
            allVideosInCurrentCourse: [],
            editor: [],
            editorName : "",
        };
        //чтобы работал setState в функции
        this.queryToDatabase = this.queryToDatabase.bind(this);
    }

    //формуриует и делает запросы в бд , а затем записывает их через setState()
    queryToDatabase(database , course , infoCategory) {
        //стираем все input'ы перед получением новых
        this.setState({
            editor: []
        });

        let linkForQuery;
        let editorName;

        if (course == "newCourse") {
            editorName = "Создание нового курса: ";
            linkForQuery = database.child("templates").child("inputNewCourse");
        } else {

            //switch определяет какую ссылку на database выдать
            switch (infoCategory) {
                case "newVideo" :
                    editorName = "Создание нового видео в курсе " + course;
                    linkForQuery = database.child("templates").child("inputNewVideo");
                    break;
                case "general" :
                    editorName = "Курс: " + course + "; Раздел: общее описание;";
                    linkForQuery = database.child("courses").child(course).child(infoCategory);
                    break;
                case "skills":
                    editorName = "Курс: " + course + "; Раздел: навыки";
                    linkForQuery = database.child("courses").child(course).child(infoCategory);
                    break;
                default :
                    editorName = "Курс: " + course + "; Видео: " + infoCategory + ";";
                    linkForQuery = database.child("courses").child(course).child("videos").child(infoCategory);
                    break;
            }
        }


        //получение значений input'ов
        linkForQuery.on('value', snap => {
            let info = [];
            snap.forEach(function (childInfo) {
                info.push(childInfo)
            });
            this.setState({
                editor: info,
                editorName : editorName
            })
        });

        //получение значений input'ов , если они были изменены в database
        linkForQuery.on('child_changed', snap => {
            let info = [];
            snap.forEach(function (childInfo) {
                info.push(childInfo)
            });
            this.setState({
                editor: info,
                editorName : editorName
            })
        })
    }

    componentDidMount() {

        //firebase
        let firebase = this.props.firebase;
        let database = firebase.database().ref();

        //кнопки
        let saveChangesBtn = document.getElementById('saveChanges');
        let openBtn = document.getElementById('openInfo');

        //мыссивы для заполнения
        let courses = [];
        let videosArray = [];

        //поля списков выбора курса и видео
        let selectCourses = document.getElementById('courses');
        let selectVideos = document.getElementById('videos');

        //листенер для кнопки сохранения изменений
        saveChangesBtn.addEventListener('click' , () => {
            let readyEditorObject = new Object();

            if (selectCourses.value == "newCourse") {

                let templateCourse = new Object();
                database.child("templates").child("newCourse").on('value' , snap => {
                    this.state.editor.map(info => {
                        let currentInput = document.getElementById(info.key + '_input');
                        templateCourse[currentInput.value] = snap.val()
                    });
                    database.child("courses").update(templateCourse);
                });
            } else {
                this.state.editor.map(info => {
                    let currentInput = document.getElementById(info.key + '_input');
                    readyEditorObject[info.key] = currentInput.value
                });
                //switch определяет какую ссылку на database выдать
                switch (selectVideos.value) {
                    case "newVideo" :
                        let templateVideo = new Object();
                        database.child("templates").child("newVideo").on('value' , snap => {
                            this.state.editor.map(info => {
                                let currentInput = document.getElementById(info.key + '_input');
                                templateVideo[currentInput.value] = snap.val()
                            });
                            database.child("courses").child(selectCourses.value).child("videos").update(templateVideo);
                        })
                        break;
                    case "general" :
                        database.child("courses").child(selectCourses.value).child(selectVideos.value).update(readyEditorObject);
                        break;
                    case "skills":
                        database.child("courses").child(selectCourses.value).child(selectVideos.value).update(readyEditorObject);
                        break;
                    default :
                        database.child("courses").child(selectCourses.value).child("videos").child(selectVideos.value).update(readyEditorObject);
                        break;
                }
            }
        });

        //листенер для кнопки загрузки информации
        openBtn.addEventListener('click' , () => {
            let selectCourses = document.getElementById('courses').value;
            let selectVideos = document.getElementById('videos').value;
            this.queryToDatabase(database , selectCourses , selectVideos);
        });

        //получение всех курсов и их видео из database при загрузке страницы
        database.child('courses').once('value', allCourses => {
            this.setState({
                allCourses: []
            })
            allCourses.forEach(function (childSnap) {
                courses.push(childSnap)
            });
            this.setState({
                allCourses: courses
            })
            //получение всех видео по данному курсу
            database.child("courses").child(selectCourses.value).child("videos").once('value', allVideos => {
                videosArray = []
                allVideos.forEach(function (video) {
                    videosArray.push(video);
                });
                this.setState({
                    allVideosInCurrentCourse: videosArray
                })
            });
        });

        // listener при выборе другого курса , и ререндер списка видео в курсе
        selectCourses.addEventListener("change", () => {
            database.child("courses").child(selectCourses.value).child("videos").on('value', snap => {
                videosArray = []
                snap.forEach(function (video) {
                    videosArray.push(video);
                });
                this.setState({
                    allVideosInCurrentCourse: videosArray
                })
            })
        });


    }

    render() {
        var selectCourse = this.state.allCourses.map(course => <option key={course.key}>{course.key}</option>)
        var selectVideo = this.state.allVideosInCurrentCourse.map(video => <option id={video.key} key={video.key + 987654}>{video.key}</option>);
        var editor = this.state.editor.map(info => <div key={info.key}><label  htmlFor={info.key}>{info.key}</label><input type="text" className="input-contact" id={info.key + '_input'} key={info.key + 321312312} defaultValue={info.val()}/></div>)

        return (
            <div className="col-md-12">
                <label htmlFor="courses">Course : </label>
                <select name="courses" id="courses">
                    <option>newCourse</option>
                    {selectCourse}
                </select>

                <label htmlFor="videos">Videos of course : </label>
                <select name="videos" id="videos">
                    <option>newVideo</option>
                    <option>general</option>
                    <option>skills</option>
                    {selectVideo}
                </select>
                <a style={{marginLeft: "5px" , marginRight: "5px"}} className="btn btn-box" id="openInfo">Показать</a>

                <div className="col-md-12" id="editor">
                    <h3>{this.state.editorName}</h3>
                    {editor}
                    <a className="btn btn-box" id="saveChanges">Сохранить изменения</a>
                </div>
            </div>
        )
    }

}


export default EditPanel;