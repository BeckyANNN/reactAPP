import React,{Component} from "react"

import Foot from "../../components/foot"

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { stop } from "pretty-error";

export default class App extends Component{
    
   
    render(){
        return(
            <ReactCSSTransitionGroup
                transitionName = "transitionWrapper"
                component="div"
                className="transitionWrapper"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                >
                <div className="moveIn app"
                    key={this.props.location.pathname}
                     style={{position:"absolute", width: "100%"}}
                >
                {this.props.children}
                </div>
                    
            </ReactCSSTransitionGroup>  
        )
    }
}