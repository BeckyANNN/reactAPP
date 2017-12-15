import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import {connect} from "react-redux"

import none from "../../../../assets/images/none.png";
export default class Xiaoxi extends Component{
   
    render(){
        return(
            <div className="xiaoxi">
               <header>
                   <div className="main">
                    <i className="iconfont icon-fanhui" onClick={()=>{hashHistory.go(-1)}}></i>
                    <h1>{this.props.params.type}</h1>
                   </div>
               </header>
               <section>
                   <img src={none}/>
               </section>
            </div>
        )
    }
}