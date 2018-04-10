import React,{Component} from "react"
import {connect} from "react-redux"
import {Link,hashHistory} from "react-router"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from "axios"

import   "../../../utils/layer/mobile/layer.js"
import {Spin} from "antd";
import {get_all_detail,get_comment_detail,get_all,get_insert_comment} from "../../actions";
import { setTimeout } from "core-js/library/web/timers";
@connect(
    (state)=>({...state})
)
export default class Subject extends Component{
    constructor(props){
        super(props);
        this.state={
            name:localStorage.getItem("name"),
            flag:false
        }
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(get_comment_detail("/detailInfo?id="+this.props.params.id,dispatch));
        dispatch(get_all_detail("/allInfo?id="+this.props.params.id,dispatch));
        dispatch(get_all("/all",dispatch));
        this.getUser();
        layer.open({
            type: 2
            ,content: '加载中',
            time: 5
          });
    }
    getArtType=(type)=>{
        switch(type){
            case 1:
                return "ONE STORY";
                break;
            case 2:
                return "连载";
                break;
            case 3:
                return "问答";
                break;
            case 4:
                return "音乐";
                break;
            case 5:
                return "影视";
                break;
            case 11:
                return "专题";
                break;
            default:
                return "电台";
                break;
        }
    }

    getUser=()=>{
        axios.get("/findUser?phone="+localStorage.name).then(res=>{
            this.setState({
                img:res.data.img
            })
        })
    }
   //获取当前时间
   getNow=()=>{
        var date = new Date();
        var h = date.getFullYear();
        var m = date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
        var d = date.getDate()<10?"0"+date.getDate():date.getDate();
        var H = date.getHours()<10?"0"+date.getHours():date.getHours();
        var M = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
        var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
        return h+"-"+m+"-"+d+" "+H+":"+M+":"+s;
    }
    send=()=>{
        var username = localStorage.getItem("name");
        if(username){
            this.setState({
                flag:true
            })
        }else{
            hashHistory.push('/login')            
        }
    }
    msg=()=>{
        const {dispatch,detailList} = this.props;
        var msg = this.refs.message.value;
        var username = localStorage.getItem("name");
        if(msg.length<=500){
            dispatch(get_insert_comment("/insertDetail",{
                content:msg,
                 name:username,
                 id:this.props.params.id,
                 inputDate:this.getNow(),
                 updateDate:this.getNow(),
                 img:this.state.img
             },dispatch));
            
            
            layer.open({
                content: '评论成功'
                ,skin: 'msg'
                ,time: 3 //3秒后自动关闭
              });
            setTimeout(()=>{
                location.reload(true)
            },1000)
            this.setState({
                        flag:false
                    })
            
            
        }else{
            layer.open({
                content:' 请输入500字以内的评论',
                style:'background-color:#424242;color:white;font-size:48px;',
                btn:['取消','放弃'],
                style:'color:green',
                no:function(){
                    that.setState({
                        flag:false
                    })
                }
            })
        }
        
        
       
    } 
    exit=()=>{
        var that = this;
         layer.open({
             content:' 是否放弃当前评论',
             style:'background-color:#424242;color:white;font-size:48px;',
             btn:['取消','放弃'],
             style:'color:green',
             no:function(){
                 that.setState({
                     flag:false
                 })
             }
         })
     }
    //锚点设置
    scrollToAnchor = (anchorName) => {
        
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { anchorElement.scrollIntoView(); }
        }
      }
    render(){
        const {allList,commentList,list } = this.props;
        var content = null;
        var comment = null;
        var cont = null;
        var html = null;
        
         if(list.length>0){
            list.map((item,index)=>{
               if(item.content_id==this.props.params.id){
                    cont = <div className="cont">
                                <img src={item.cover}/>
                                <h2>{item.title}</h2>
                                <p>{item.subtitle}</p>
                            </div>
                   
               }
           })
         } 
         if(allList.length>0){
             html =  <div className="main">
                {
                    allList.map((item,index)=>{
                        if(item.id==this.props.params.id){
                            return(
                                <dl key={index}>
                                    <dt><img src={item.link}/></dt>
                                    <dd>
                                        <h2>{item.title}</h2>
                                        <p>{item.subtitle}</p>
                                    </dd>
                                </dl>
                            )
                            
                                    
                        }
             })
                }
            </div>
             
         }
         
        comment = (
            <div className="comment-main">
                {
                    commentList.map((item,i)=>{
                        return(
                            <div className="comment-list" key={i}>
                                <div className="top">
                                    <dl>
                                        <dt><img src={item.user.web_url}/></dt>
                                        <dd>{item.user.user_name}</dd>
                                    </dl>
                                    <span>{item.input_date}</span>
                                </div>
                                <div className="center">
                                    <p>{item.content}</p>
                                </div>
                                <div className="bottom">
                                    <i className="iconfont icon-pinglun"></i>
                                    <span>{item.praisenum}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        ) 
        
        
        
        return(
            <div className="subject">
                <header>
                    <div className="header-main">
                        <i className="iconfont icon-fanhui" onClick={()=>{this.props.router.goBack()}}></i>
                        <h1>专题</h1>
                    </div>
                </header>
                <section>
                    {cont}
                    {html}
                    <div className="comment" id="comment">
                        <h2>评论列表</h2>
                        <br/>
                        {comment}
                    </div>
                </section>
                
                <div className="footer">
                    <div className="foot-main">
                        <input type="text" placeholder="写一个评论..." onClick={this.send}/>
                        <div className="icon">
                            <i className="iconfont icon-pinglun" onClick={()=>this.scrollToAnchor("comment")}><sup>{commentList.length}</sup></i>
                            <i className="iconfont icon-tiaozhuandaomulu" onClick={()=>{hashHistory.push("/share")}}></i>
                        </div>
                    </div>
                </div>
                <div className={this.state.flag?"pinglun show":"pinglun hide"}>
                    <div className="exit" onClick={this.exit}></div>
                    <div className="ping">
                        <textarea placeholder="在这里写下你想说的" ref="message"></textarea>
                        <span>500</span>
                        <button onClick={this.msg}>发送</button>
                    </div>
                </div>
            </div>
            
            
        )
    }
}