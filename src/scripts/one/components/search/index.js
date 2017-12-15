import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import {connect} from "react-redux"


export default class Search extends Component{
   
    render(){
        return(
            <div className="search">
               <header>
                   <div className="main">
                    <input placeholder="在这里写下你想寻找的"/>
                    <button onClick={()=>{hashHistory.go(-1)}}>取消</button>
                   </div>
               </header>
               <section>
                   <a href="#">图文</a>
                   <a href="#">问答</a>
                   <a href="#">阅读</a>
                   <a href="#">连载</a>
                   <a href="#">影视</a>
                   <a href="#">音乐</a>
                   <a href="#">电台</a>
                   
               </section>
            </div>
        )
    }
}