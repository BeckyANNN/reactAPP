import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, hashHistory } from "react-router"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {get_cover,get_one } from "../../actions"
import axios from "axios";
@connect(
    (state) => ({ ...state })
)
export default class Cover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            name: localStorage.name,
            coverList:[],
            one:[]
        }
    }
 


   
    componentWillMount() {
      
        const { dispatch } = this.props;
        dispatch(get_one("/one", dispatch));
        dispatch(get_cover("/getCover",dispatch));  

    }
    //类型转换
    changeType=(type)=>{
        switch(type){
            case 0:
                return "图文";
                break;
            case 3:
                return "问答";
                break;
            case 1:
                return "阅读";
                break;
            case 2:
                return "连载";
                break;
            case 5:
                return "影视";
                break;
            case 4:
                return "音乐";
                break;
            default:
                return "电台";
                break;
        }
    }
    render() {
        const { coverList,one } = this.props;
        const {type} = this.props.location.state;
        const { name } = this.state;
        var cover =null;
        if(coverList.length>0&&type==0){
            cover = (
                <div className="cover">
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
        if(one.length>0&&type!=0){
            cover = (
                <div className="read-list">
                {
                    one.map((item,index)=>{
                        if(item.content_type==type){
                            return(
                                <Link to={"/detail/"+item.item_id} key={index}>
                                    <dl className="top">
                                        <dt>
                                            <img src={item.img_url}/>
                                        </dt>
                                        <dd>
                                            <p>{item.title}</p>
                                        </dd>
                                    </dl>
                                </Link>
                            )
                        }
                    })
                }
                </div>
            )
        }
        return (

            <div className="one xiaoxi">
                <header>
                    <i className="iconfont icon-fanhui" onClick={()=>{hashHistory.go(-1)}}></i>
                    <h1>{this.changeType(type)}</h1>
                </header>
                <section>
                {cover}
                </section>

            </div>

        )
    }
}