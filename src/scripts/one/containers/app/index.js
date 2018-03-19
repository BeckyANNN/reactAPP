import React,{Component} from "react"

import Foot from "../../components/foot"

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { stop } from "pretty-error";

export default class App extends Component{
    
   
    render(){
        return(
            <div className="moveIn app" ref="app">
            <ReactCSSTransitionGroup
                transitionName = {
                    {
                        enter: 'enter',
                        leave: 'leave',
                    }
                }
                transitionLeave={true}
                transitionEnter={true}
                transitionLeaveTimeout = {800}
                transitionEnterTimeout = {800}
                >
              
                    {this.props.children}
                </ReactCSSTransitionGroup>
           
           
        </div>
           
        )
    }
}