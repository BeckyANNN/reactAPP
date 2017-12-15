import React,{Component} from "react"
import {Link,hashHistory} from "react-router"

import Foot from "../../components/foot"

import touxiang from "../../../../assets/images/touxiang.jpg"
export default class Me extends Component{
    componentDidMount(){
        if(localStorage.getItem("name")){
            this.refs.me.style.background="white";
        }else{
            
        }
    }
   /*  change=()=>{
        var name = localStorage.getItem("name");
        if(localStorage.getItem(name)){
            //location.href = '/article/文章'
            hashHistory.push('/article/文章');
        }else{
            hashHistory.push('/xiaoxi/文章')
        }
    } */
    render(){
        return(
            <div className="me" ref="me">
                
                <div className={localStorage.getItem("name")?"hide":"show"}>
                    <div className="info">
                        <Link to="/login"/>
                        <p>点击登录</p>
                    </div>
                </div>
                <div className={localStorage.getItem("name")?"show":"hide"}>
                
                    <div className="login-info">
                        <i className="iconfont icon-shezhi" onClick={()=>{hashHistory.push('/shezhi')}}></i>
                        <i className="iconfont icon-xinxi" onClick={()=>{hashHistory.push('/message')}}></i>
                       <div className="touxiang">
                           <img src={touxiang}/>
                           <p>{localStorage.getItem("name")}</p>
                       </div>
                       <a href="#"></a>
                       
                    </div>
                    <div className="list">
                        <div className="list-main">
                            <div className="item">
                                <h2>我的收藏</h2>
                                <div className="dlist" onClick={()=>{hashHistory.push('/xiaoxi/图文')}}>
                                    <i className="iconfont icon-tuwen"></i>
                                    <span>图文</span>
                                </div>
                                <div className="dlist" onClick={()=>{hashHistory.push('/article/文章')}}>
                                    <i className="iconfont icon-wenzhang"></i>
                                    <span>文章</span>
                                </div>
                                <div className="dlist" onClick={()=>{hashHistory.push('/xiaoxi/音乐')}}>
                                    <i className="iconfont icon-yinyue"></i>
                                    <span>音乐</span>
                                </div>
                                <div className="dlist" onClick={()=>{hashHistory.push('/xiaoxi/影视')}}>
                                    <i className="iconfont icon-shipinbofangyingpian2"></i>
                                    <span>影视</span>
                                </div>
                                <div className="dlist" onClick={()=>{hashHistory.push('/xiaoxi/电台')}}>
                                    <i className="iconfont icon-diantai"></i>
                                    <span>电台</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="list-main">
                            <div className="list-item">
                                <div className="left">
                                    <i className="iconfont icon-wode"></i>
                                    <span>我的关注</span>
                                </div>
                                <div className="right" onClick={()=>{hashHistory.push('/xiaoxi/我的关注')}}>
                                    <span>0</span>
                                    <i className="iconfont icon-gengduo"></i>
                                </div>
                            </div>
                        </div>
                        <div className="list-main">
                            <div className="list-item">
                                <div className="left">
                                    <i className="iconfont icon-yinyue"></i>
                                    <span>歌单</span>
                                </div>
                                <div className="right" onClick={()=>{hashHistory.push('/xiaoxi/我的歌单')}}>
                                    <span>0</span>
                                    <i className="iconfont icon-gengduo"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Foot/>
            </div>
            
       
        )
    }
}