import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, hashHistory } from "react-router"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { get_one, get_update_detail, get_user_detail, get_one_detail } from "../../actions"
import axios from "axios"

import Foot from "../../components/foot"
/* axios.defaults.baseURL = "http://39.106.19.127:3000" */
/* axios.defaults.baseURL = "http://localhost:3000"; */
@connect(
    (state) => ({ ...state })
)


export default class One extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            name: localStorage.name
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
            this.refs.rotate.className = "iconfont icon-down-trangle-copy-copy";
        } else {
            this.refs.rotate.className = "iconfont icon-down-trangle-copy-copy rotate";
        }

    }
    componentWillMount() {
        const { one, like } = this.props;
        const { dispatch } = this.props;
        dispatch(get_one("/one", dispatch));
        dispatch(get_user_detail("/detailInfo", dispatch));



    }


    zan = (id, like, like_count, e) => {
        const { dispatch} = this.props;
        var name = localStorage.getItem("name");
        like = !like;
        if (name) {
            if(like) {
                e.target.className = "after";
                like_count++;
            }else{
                e.target.className = "before";
                like_count--;
            }
            dispatch(get_update_detail(id));
            dispatch(get_one_detail("/insertLike?id=" + id + "&like=" + like*1 + "&name=" + name + "&like_count=" + like_count, dispatch));

        } else {
            hashHistory.push('/login')
        }
    }
    render() {
        const { one } = this.props;
        const { name } = this.state;
        var html = null;
        var vol = null;
        if (one.length > 0) {

            html = (
                <div>
                    {
                        one.map((item1, i) => {
                         
                            return (

                                <div className="item" key={i}>

                                    <div className="item-main" id={item1.title}>
                                        <Link to={"detail/" + item1.id}>
                                            <span>--{item1.share_list.wx.title.split("|")[0] ? item1.share_list.wx.title.split("|")[0] : "ONE STORY"}--</span>
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
        return (

            <div className="one">
                <header>
                    <p>2017<span>/</span>11<span>/</span>18</p>
                </header>
                <div className="main">
                    <div className="img"></div>
                    <span>插画 | 《纪念碑谷2》</span>
                    <p>我开始明白我自己。我不存在。 我是我想成为的那个人和别人把我塑造成的那个人之间的裂缝。 或半个裂缝，因为还有生活…… 这就是我。没有了。 关灯，闭户，把走廊里的拖鞋声隔绝。 我一个人呆在屋里，和我自己巨大的平静呆在一起。 我是一个冒牌的宇宙。</p>
                    <span>佩索阿</span>

                    <div className="bottom">VOL.1869
                        <i className="iconfont icon-down-trangle-copy-copy" onClick={this.showItem} ref="rotate"></i>
                        <div className={this.state.flag ? "show" : "hide"}>
                            {vol}
                        </div>
                    </div>
                    {html}

                </div>

                <Foot />
            </div>

        )
    }
}