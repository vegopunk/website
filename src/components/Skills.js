import React , {Component} from 'react'

class Skills extends Component{
    render(){
        return(
            <ul className="cat-ul">
                {this.props.skills.map((skill , index) => {
                    return <li key={index+5}><i className="ion-ios-circle-filled"></i> {skill}</li>
                })}
            </ul>
        )
    }
}

export default Skills
