import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, hashHistory } from "react-router"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { get_one, get_update_detail, get_user_detail, get_one_detail,get_date_oneStory,get_cover } from "../../actions"
import axios from "axios"

import Foot from "../../components/foot"
/* axios.defaults.baseURL = "http://39.106.19.127:3000" */
/* axios.defaults.baseURL = "http://localhost:3000"; */

import open from "../../../../assets/images/open.png"
@connect(
    (state) => ({ ...state })
)


export default class One extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            name: localStorage.name,
            openImg:true
        }
    }
    //锚点设置
    scrollToAnchor = (anchorName) => {
        this.showItem();
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) { anchorElement.scrollIntoView(); }
        }
    }


    showItem = () => {
        this.setState({
            flag: !(this.state.flag)
        });
        if (this.state.flag) {
            this.refs.rotate.className = "iconfont icon-down-trangle-copy-copy backRotate";
        } else {
            this.refs.rotate.className = "iconfont icon-down-trangle-copy-copy rotate";
        }

    }
    componentWillMount() {
        const { one, like } = this.props;
        const { dispatch } = this.props;
        dispatch(get_one("/one", dispatch));
        dispatch(get_user_detail("/detailInfo", dispatch));
        dispatch(get_date_oneStory("/findOneStory?date=2018/03/19",dispatch));
        dispatch(get_cover("/getCover",dispatch));  

    }
    //获取当前时间
    getNow=()=>{
        var date = new Date();
        var h = date.getFullYear();
        var m = date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
        var d = date.getDate()<10?"0"+date.getDate():date.getDate();
        return h+"/"+m+"/"+d;
    }
    //改变时间格式
    changeDate=(date)=>{
        switch(date.split("/")[1]){
            case "01":
                return "Jan";
                break;
            case "02":
                return "Feb";
                break;
            case "03":
                return "Mar";
                break;
            case "04":
                return "Apr";
                break;
            case "05":
                return "May";
                break;
            case "06":
                return "June";
                break;
            case "07":
                return "July";
                break;
            case "08":
                return "Aug";
                break;
            case "09":
                return "Sept";
                break;
            case "10":
                return "Oct";
                break;
            case "11":
                return "Nov";
                break;
            default:
                return "Dec";
                break;
        }
    }
    //获取文章类型
    getArtType=(type)=>{
        switch(type){
            case "1":
                return "ONE STORY";
                break;
            case "2":
                return "连载";
                break;
            case "3":
                return "问答";
                break;
            case "4":
                return "音乐";
                break;
            case "5":
                return "影视";
                break;
            default:
                return "电台";
                break;
        }
    }

    zan = (id, like, like_count, e) => {
        const { dispatch} = this.props;
        var name = localStorage.getItem("name");
        like = !like;
        if (name) {
            if(Number(like)) {
                e.target.className = "after";
                like_count++;
            }else{
                e.target.className = "before";
                like_count--;
            }
            dispatch(get_update_detail(id));
            dispatch(get_one_detail("/updateLike?id=" + id + "&like=" + like*1 + "&name=" + name + "&like_count=" + like_count, dispatch));

        } else {
            hashHistory.push('/login')
        }
    }
    render() {
        const { one,oneStoryDate,coverList } = this.props;
        const { name,openImg } = this.state;
        var html = null;
        var vol = null;
        var weather = null;
        var des = null;
        var cover =null;
        if(oneStoryDate.length>0){
            oneStoryDate.map((item,index)=>{
                if(item.date.split(" ")[0]=="2018-03-19"){
                    weather=(
                        <span className="weather">
                            {`${item.weather.city_name}·${item.weather.climate} ${item.weather.temperature}℃`}
                        </span>
                    )
                    
                    vol = (
                        <div>
                            {
                                item.menu.list.map((item, i) => {
                                    return (
                                        <div className="sec" key={i}>
                                            <i className="iconfont icon-gengduo"></i>
                                            <div className="list" onClick={() => this.scrollToAnchor(item.title)}>
                                                <span>{this.getArtType(item.content_type)}</span>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                    des=(
                        <div className="des">
                            {/* <div className="img"></div> */}
                            <img src={item.content_list[0].img_url}/>
                            <span>{item.content_list[0].title} | {item.content_list[0].pic_info}</span>
                            <p>{item.content_list[0].forward}</p>
                            <span>{item.content_list[0].words_info}</span>
                            <div className="bottom">{"一个 VOL"+item.menu.vol}
                                <i className="iconfont icon-down-trangle-copy-copy" onClick={this.showItem} ref="rotate"></i>
                                <div className={this.state.flag ? "show" : "hide"}>
                                    {vol}
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
        if (one.length > 0) {
            html = (
                <div>
                    {
                        one.map((item1, i) => {
        
                            return (

                                <div className="item" key={i}>

                                    <div className="item-main" id={item1.title}>
                                        <Link to={"detail/" + item1.item_id}>
                                            <span>-- {this.getArtType(item1.content_type)} --</span>
                                            <h2>{item1.title}</h2>
                                            <p>文 / {item1.author.user_name ? item1.author.user_name : "匿名"}</p>
                                            <img src={item1.img_url} />
                                            <p>{item1.forward}</p>
                                        </Link>
                                        <div className="left">{item1.post_date.split(" ")[0]}</div>
                                        <div className="right">
                                            <a href="javascript:void(0);" onClick={(e) => {
                                                 this.zan(item1.id, item1.like_detail.username==name?item1.like_detail.like:0, item1.like_count*1, e) 
                                                }
                                            } className={item1.like_detail.like&&item1.like_detail.username==name?"after":"before"}><sup>{item1.like_count}</sup></a>
                                            <i className="iconfont icon-tiaozhuandaomulu" onClick={() => { hashHistory.push("/share") }}></i>
                                        </div>
                                    </div>
                                </div>

                            )

                        })
                    }
                </div>
            )


            vol = (
                <div>
                    {
                        one.map((item, i) => {
                            return (
                                <div className="sec" key={i}>
                                    <i className="iconfont icon-gengduo"></i>
                                    <div className="list" onClick={() => this.scrollToAnchor(item.title)}>
                                        <span>{item.share_list.wx.title.split("|")[0] ? item.share_list.wx.title.split("|")[0] : "ONE STORY"}</span>
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        if(coverList.length>0){
            cover = (
                <div className="cover" style={{display:openImg?"none":"block"}}>
                    {
                        coverList.map((item,index)=>{
                            return(
                                <dl key={index}>
                                    <dt><img src={item.cover}/></dt>
                                    <dd>{item.date.replace(/\-/g,' / ')}</dd>
                                </dl>
                            )
                        })
                    }
                </div>
            )
        }
        return (

            <div className="one">
                <header>
                    <p>
                        <span>{this.getNow().split("/")[2]}</span>
                        <span>{`${this.changeDate(this.getNow())}.${this.getNow().split("/")[0]}`}</span>
                        <img src={open} ref="openImg" className="" onClick={()=>{
                            
                            this.setState({
                                openImg:!(this.state.openImg)
                            })
                            if(openImg){
                                this.refs.openImg.className="rotateZ";
                            }else{
                                this.refs.openImg.className="";
                            }
                        }}/>
                    </p>
                    {weather} 
                </header>
                <div className="main">
                    {des}

                    
                    {html}
                    {cover}
                </div>

                <Foot />
            </div>

        )
    }
}