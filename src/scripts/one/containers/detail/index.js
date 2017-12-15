import React,{Component} from "react"
import {connect} from "react-redux"
import {Link,hashHistory} from "react-router"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import   "../../../utils/layer/mobile/layer.js"

import {get_detail,get_comment_detail,get_one_item,get_one_detail,get_update_detail,get_one,get_insert_comment,get_insert_collection,find_one_collection} from "../../actions"
@connect(
    (state)=>({...state})
)
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:false,
            name:localStorage.getItem("name")
        }
    }
    componentWillMount(){
        const {dispatch} = this.props;
        var name = localStorage.getItem("name");
        dispatch(get_one("/one",dispatch));
        dispatch(get_detail("/oneDetail?id="+this.props.params.id,dispatch));
        dispatch(get_comment_detail("/detailInfo",dispatch));
        dispatch(get_one_item("/oneDetail?id="+this.props.params.id,dispatch));
        dispatch(find_one_collection("/oneCollection?username="+name,dispatch));
    }
    
    send=()=>{
        this.setState({
            flag:true
        })

        
    }
    msg=()=>{
        
        const {dispatch} = this.props;
        var msg = this.refs.message.value;
        var username = localStorage.getItem("name");
        dispatch(get_insert_comment("/insertDetail?content="+msg+"&name="+username,dispatch));
        location.href=hashHistory.getCurrentLocation().pathname;

       
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
 
    zan = (id, like, like_count, e) => {
        const { dispatch } = this.props;
        var name = localStorage.getItem("name");
        console.log(like);
        like = (like=="true"?true:false);
        console.log(like);
        like = !like;
        console.log(like);
        if (name) {
            if(like) {
                e.target.className = "after";
                like_count++;
            }else{
                e.target.className = "before";
                like_count--;
            }
            dispatch(get_update_detail(id));
            dispatch(get_one_detail("/updateLike?id=" + id + "&like=" + like + "&name=" + name + "&like_count=" + like_count, dispatch));

        } else {
            hashHistory.push('/login')
        }
    }

    shoucang=(id,type,title)=>{
        const {dispatch} = this.props;
        var name = localStorage.getItem("name");
        if(name){
            
            this.refs.shoucang.style.color = "red";
            dispatch(get_insert_collection("/insertCollection?id="+id+"&username="+name+"&type="+type+"&title="+title,dispatch));
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
         const {detailList,commentList,oneItem,one ,userCollection} = this.props;
         const {name} = this.state;
        var head = null;
        var content = null;
        var title = null;
        var author = null;
        var comment = null;
        var zan =  null;
        var pinglun = null;
        var shoucang = null;
       
       if(detailList){
            head=detailList.share_list.wx.title.split("|")[0]?detailList.share_list.wx.title.split("|")[0]:"ONE STORY"
            content=detailList.content;
            title=detailList.title;
            author=detailList.share_list.wx.desc.split(" ")[0];
        }
      
         if(oneItem){
             
           
            if(userCollection){
                shoucang = <i className="iconfont icon-biaoqian" onClick={()=>{this.shoucang(oneItem.id,oneItem.share_list.wx.title.split("|")[0]?oneItem.share_list.wx.title.split("|")[0]:"阅读",oneItem.title?oneItem.title:"ONE　SROTY")}} ref="shoucang"></i>
                for(var i in userCollection){ 
                    if(userCollection[i].id==oneItem.id){
                        shoucang = <i className="iconfont icon-biaoqian" onClick={()=>{this.shoucang(oneItem.id,oneItem.share_list.wx.title.split("|")[0]?oneItem.share_list.wx.title.split("|")[0]:"阅读",oneItem.title?oneItem.title:"ONE　SROTY")}} ref="shoucang" style={{color:"red"}}></i>
                    }
                }
            }
            
            if(oneItem.like_detail){
               console.log(oneItem);
               console.log(typeof oneItem.like_detail.like);
               console.log(oneItem.like_detail.like=="true"?true:false);
                zan=<a href="javascript:void(0);" onClick={(e)=>{this.zan(oneItem.id,oneItem.like_detail.like,oneItem.like_count,e)}}  className={(oneItem.like_detail.like=='true')?"after":"before"}><sup>{oneItem.like_count}</sup></a>
                
            }
           
            
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
                                    <span>{item.created_at}</span>
                                </div>
                                <div className="center">
                                    <p>{item.content}</p>
                                </div>
                                <div className="bottom">
                                    <i className="iconfont icon-pinglun"></i>
                                    <i className="iconfont icon-dianzan1"></i>
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
                        <i className="iconfont icon-fanhui" onClick={()=>{this.props.router.goBack()}}></i>
                        <h1>{head}</h1>
                        {shoucang}
                    </div>
                </header>
                <section>
                    <div className="title">{title}</div>
                    <div className="author">{author}</div>
                    <div className="cont">{content}</div>
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
                            {zan}
                            <i className="iconfont icon-pinglun" onClick={()=>this.scrollToAnchor("comment")}><sup>5</sup></i>
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