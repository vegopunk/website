import React , {Component} from 'react'
import {Link} from 'react-router-dom'



const ContentElement = ({course}) => (

    <div className="col-md-3 col-sm-6  fashion logo" >
        <Link to={`/course/${course.key}`} className="portfolio_item">
            <img src={course.val().general.imageLink} alt="image" className="img-responsive" />
            <div className="portfolio_item_hover">
                <div className="portfolio-border clearfix">
                    <div className="item_info">
                        <span>{course.val().general.title}</span>
                        <em>{course.val().general.category}</em>
                    </div>
                </div>
            </div>
        </Link>
    </div>
);


export default ContentElement