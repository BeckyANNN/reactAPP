import React,{Component} from "react"
import {connect} from "react-redux"
import {Link,hashHistory} from "react-router"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import   "../../../utils/layer/mobile/layer.js"

import {get_detail,get_comment_detail,get_one_item,get_one_detail,get_update_detail,get_one,get_insert_comment,get_update_collection,get_insert_collection} from "../../actions"
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
        //dispatch(find_one_collection("/oneCollection?username="+name,dispatch));
    }
    
    send=()=>{
        this.setState({
            flag:true
        })

        
    }
    msg=()=>{
        const {dispatch,detailList} = this.props;
        var msg = this.refs.message.value;
        var username = localStorage.getItem("name");
        dispatch(get_insert_comment("/insertDetail?content="+msg+"&name="+username+"&id="+detailList.id,dispatch));
        //location.href="/#"+hashHistory.getCurrentLocation().pathname;
        dispatch(get_comment_detail("/detailInfo",dispatch));
        this.setState({
            flag:false
        })
       
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


    shoucang=(id,collection)=>{
        const {dispatch} = this.props;
        var name = localStorage.getItem("name");
        collection = !collection;
        if(name){
            if(collection*1){
                this.refs.shoucang.style.color = "red";
            }else{
                this.refs.shoucang.style.color = "black";
            }
            dispatch(get_update_collection(id));
            dispatch(get_insert_collection("/updateCollection?id="+id+"&name="+name+"&collection="+collection*1,dispatch));
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
        const {detailList,commentList,one } = this.props;
        const {name} = this.state;
        var head = null;
        var content = null;
        var title = null;
        var author = null;
        var comment = null;
        //var pinglun = null;
        var shoucang = null;
        if(detailList){
            head=detailList.share_list.wx.title.split("|")[0]?detailList.share_list.wx.title.split("|")[0]:"ONE STORY"
            content=detailList.content;
            title=detailList.title;
            author=detailList.share_list.wx.desc.split(" ")[0];
            shoucang = <i className="iconfont icon-biaoqian" 
                        style={{color:detailList.like_detail.collection&&detailList.like_detail.username==name?'red':''}}
                        onClick={()=>{this.shoucang(detailList.id,detailList.like_detail.collection)}} 
                        ref="shoucang"></i>
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