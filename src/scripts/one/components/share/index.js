import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import {connect} from "react-redux"


export default class Share extends Component{
   
    render(){
        return(
            <div className="share">
               <header>
                   <span onClick={()=>{hashHistory.go(-1)}}></span>
               </header>
               <section>
                   <a href="#"></a>
                   <a href="#"></a>
                   <a href="#"></a>
                   <a href="#"></a>
                   <a href="#"></a>
               </section>
            </div>
        )
    }
}