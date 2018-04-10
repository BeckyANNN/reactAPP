import React,{Component} from "react"
import {connect} from "react-redux"
import {Link,hashHistory} from "react-router"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import   "../../../utils/layer/mobile/layer.js"
import axios from "axios";

import {get_detail,get_comment_detail,get_insert_comment,get_one_item,get_update_collection,get_insert_collection} from "../../actions";
import { setTimeout } from "core-js/library/web/timers";
@connect(
    (state)=>({...state})
)
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:false,
            name:localStorage.getItem("name"),
        }
    }
    componentWillMount(){
        const {dispatch} = this.props;
        var name = localStorage.getItem("name");
        dispatch(get_detail("/getDetail?id="+this.props.params.id,dispatch));
        dispatch(get_comment_detail("/detailInfo?id="+this.props.params.id,dispatch));
        dispatch(get_one_item("/oneDetail?id="+this.props.params.id+"&name="+name,dispatch));
        this.getUser();
        layer.open({
            type: 2
            ,content: '加载中',
            time: 3
          });
        //dispatch(find_one_collection("/oneCollection?username="+name,dispatch));
    }
    getUser=()=>{
        axios.get("/findUser?phone="+localStorage.name).then(res=>{
            this.setState({
                img:res.data.img
            })
        })
    }
    //获取文章类型
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
            default:
                return "电台";
                break;
        }
    }
    send=()=>{
        this.setState({
            flag:true
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
    //评论
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
            dispatch(get_detail("/getDetail?id="+this.props.params.id,dispatch)); 
            dispatch(get_comment_detail("/detailInfo?id="+this.props.params.id,dispatch));
            //location.reload(true)
            setTimeout(()=>{
                layer.open({
                    content: '评论成功'
                    ,skin: 'msg'
                    ,time: 3 //2秒后自动关闭
                  });
            },1000)
            setTimeout(()=>{
                location.reload(true)
            },2000)
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


    shoucang=(collection)=>{
        const {dispatch} = this.props;
        var name = localStorage.getItem("name");
        collection = !collection;
        if(name){
            if(Number(collection)){
                this.refs.shoucang.style.color = "red";
            }else{
                this.refs.shoucang.style.color = "black";
            }
            dispatch(get_update_collection(name));
            dispatch(get_insert_collection("/updateCollection?id="+this.props.params.id+"&name="+name+"&collection="+Number(collection)*1,dispatch));
            dispatch(get_one_item("/oneDetail?id="+this.props.params.id+"&name="+name,dispatch));
        }else{
            hashHistory.push('/login')
        }
       
    }
    //锚点设置
    scrollToAnchor = (anchorName) => {
        
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { anchorElement.scrollIntoView(); }
        }
      }

    render(){
        const {detailList,commentList,oneItem } = this.props;
        const {name} = this.state;
        var head = null;
        var content = null;
        var title = null;
        var author = null;
        var comment = null;
        var shoucang = null;
        console.log(detailList)
         if(detailList){
            head=this.getArtType(detailList[0].category);
            if(this.refs.cont){
                this.refs.cont.innerHTML = detailList[0].html_content;       
            } 
                
           
        } 
        if(oneItem.length>0){
            shoucang = <i className="iconfont icon-biaoqian" 
            style={{color:oneItem[0].like_detail.collection?"red":""}}
            onClick={()=>{this.shoucang(oneItem[0].like_detail.collection)}} 
            ref="shoucang"></i>
            
        }
        //评论
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
            <div className="detail">
                <header>
                    <div className="header-main">
                        <i className="iconfont icon-fanhui" onClick={()=>{hashHistory.go(-1)}}></i>
                        <h1>{head}</h1>
                        {shoucang}
                    </div>
                </header>
                <section>
                    <div className="title">{title}</div>
                    <div className="cont" ref="cont"></div>
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