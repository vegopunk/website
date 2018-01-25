/**
 * Created by vegopunk on 22.12.2017.
 */
import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import '../styles/Header.css';
import $ from "jquery"

function menuAnimation() {
    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var MQL = 1170;

//primary navigation slide-in effect
    if($(window).width() > MQL) {
        var headerHeight = $('.box-header').height();
        $(window).on('scroll',
            {
                previousTop: 0
            },
            function () {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop ) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.box-header').hasClass('is-fixed')) {
                        $('.box-header').addClass('is-visible');
                    } else {
                        $('.box-header').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.box-header').removeClass('is-visible');
                    if( currentTop > headerHeight && !$('.box-header').hasClass('is-fixed')) $('.box-header').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }

//open/close primary navigation
    $('.box-primary-nav-trigger').on('click', function(){
        $('.box-menu-icon').toggleClass('is-clicked');
        $('.box-header').toggleClass('menu-is-open');

        //in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if( $('.box-primary-nav').hasClass('is-visible') ) {
            $('.box-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('.box-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
                $('body').addClass('overflow-hidden');
            });
        }
    });
}
function preloaderLogo() {
    $('.box-header').fadeOut(); // will first fade out the loading animation
    $('.box-header').delay(1500).fadeIn('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(1500).css({
        'overflow': 'visible'
    });
}

class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
            logo : '',
            auth : false,
            user : {},
            links : []
        };

    }

    componentWillMount() {
        let firebase = this.props.firebase;
        let dbRef = firebase.database().ref();
        let titles = dbRef.child("titles");
        let logo = titles.child("logo");
        logo.on('value' , snap => {
            this.setState( {
                logo : snap.val()
            })
        });

        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dbRef.child("users").child(user.uid).on('value' , snap => {

                    // console.log(snap.val().status.admin)

                    this.setState({
                        auth: true,
                        user : snap.val()
                    })
                });
                menuAnimation();
            } else {
                this.setState({
                    auth: false
                })
            }
        });
    }

    componentDidMount(){
        preloaderLogo();
        const logOut = document.getElementById('logOut');
        logOut.addEventListener('click' , () => {
            let firebase = this.props.firebase;
            firebase.auth().signOut();
            $("html, body").animate({ opacity: 0, transition: "opacity 1000s ease" }, 900, function() {location.reload(); });
        });


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

    }

    render(){
        var menuItem;
        var admin;
        var logoLink;

        if (this.state.auth){
            // console.log(this.state.user.status.admin)


            //проверка на права админа
            if (admin = this.state.user.status.admin) {
                admin = <Link to="/admin" id="admin" style={{cursor: "pointer"}}>Админ панель</Link>
            }

            menuItem = <div className="box-primary-nav-trigger">

                <div className="box-menu-text">{this.state.user.nickname}</div><div className="box-menu-icon"></div>
            </div>
        } else {
            menuItem = <div className="box-primary-nav-trigger"><Link to="/auth" className="box-menu-text">Login/SignUp</Link></div>
        }

        if (window.location.pathname !== "/") {
            logoLink = <Link to="/"><img src={this.state.logo} width="80"/></Link>
        } else {
            logoLink = <img src={this.state.logo} width="80"/>
        }


        return(


            <div className="container-fluid">

                <header className="box-header">
                    <div className="box-logo" >

                        {logoLink}

                    </div>
                    {menuItem}
                </header>


                <nav>
                    <ul className="box-primary-nav">
                        <li className="box-label">Меню</li>

                        <li><Link to="/profile">Профиль</Link></li>
                        <li>{admin}</li>
                        <li><Link to="/" id="logOut" style={{cursor: "pointer"}}>Выйти</Link></li>



                        <li className="box-label">Подписывайтесь на наши ресурсы:</li>
                        {this.state.links.map(link => <li key={link.key} ><a target="_blank" style={{color: "#9a9a9a"}} href={link.val()}>{link.key}</a></li>)}

                    </ul>

                </nav>


            </div>
        )
    }
}

export default Header

