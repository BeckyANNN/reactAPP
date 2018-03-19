import React,{Component} from "react"
import {Link,hashHistory} from "react-router"


export default class Search extends Component{
   
    render(){
        const {dispatch} = this.props;
        return(
            <div className="message">
               <header>
                   <div className="main">
                    <i className="iconfont icon-fanhui" onClick={()=>{hashHistory.go(-1)}}></i>
                    <h1>设置</h1>
                   </div>
               </header>
               <section>
                   <div className="list">
                       <div className="list-main">
                            <i className="iconfont icon-pinglun"></i>
                            <span onClick={()=>{hashHistory.push('/xiaoxi/评论')}}>评论</span>
                       </div>
                   </div>
                   <div className="list">
                       <div className="list-main">
                            <i className="iconfont icon-dianzan1"></i>
                            <span onClick={()=>{hashHistory.push('/xiaoxi/点赞')}}>点赞</span>
                       </div>
                   </div>
               </section>
            </div>
        )
    }
}