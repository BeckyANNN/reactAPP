import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import {connect} from "react-redux"

import {get_one} from "../../actions";

import {Tabs} from "antd";
const TabPane = Tabs.TabPane;

import none from "../../../../assets/images/none.png";
@connect(
    (state)=>({...state})
)


export default class Article extends Component{
   
   componentWillMount(){
       const {dispatch} = this.props;
       var name = localStorage.getItem("name"); 
       //dispatch(find_one_collection("/oneCollection?username="+name,dispatch));
       dispatch(get_one("/one",dispatch));
   }


   
    render(){
        const {one} = this.props;
        var read = null;
        var lianzai = null;
        var wenda = null;
        var none = <img src={none}/>;
        if(one.length>0){
            read=(
                <div className="read">
                    {
                        one.map((item,i)=>{
                            if(item.type=="阅读" && item.like_detail.collection){
                                return(
                                    <div className="read-list" key={i}> 
                                    <div className="left">
                                        <span>{item.type}</span>
                                        <p>{item.title}</p>
                                    </div>
                                    <Link to={"/detail/"+item.id}>
                                    <i className="iconfont icon-gengduo"></i>
                                    </Link>
                                </div>
                                )
                            }
                        })
                    }
                </div>
            );
            lianzai=(
                <div className="read" style={{display:'none'}}>
                    {
                        one.map((item,i)=>{
                            if(item.type=="连载" && item.like_detail.collection){
                                return(
                                    <div className="read-list" key={i}> 
                                    <div className="left">
                                        <span>{item.type}</span>
                                        <p>{item.title}</p>
                                    </div>
                                    <Link to={"/detail/"+item.id}>
                                     <i className="iconfont icon-gengduo"></i>
                                    </Link>
                                </div>
                                )
                            }
                        })
                    }
                </div>
            );
            wenda=(
                <div className="read" style={{display:'none'}}>
                    {
                        one.map((item,i)=>{
                            if(item.type=="问答" && item.like_detail.collection){
                                return(
                                    <div className="read-list" key={i}> 
                                    <div className="left">
                                        <span>{item.type}</span>
                                        <p>{item.title}</p>
                                    </div>
                                    <Link to={"/detail/"+item.id}>
                                     <i className="iconfont icon-gengduo"></i>
                                    </Link>
                                </div>
                                )
                            }
                        })
                    }
                </div>
            )

        }
        return(
            <div className="article">
               <header>
                   <div className="main">
                    <i className="iconfont icon-fanhui" onClick={()=>{hashHistory.go(-1)}}></i>
                    <h1>{this.props.params.type}</h1>
                   </div>
               </header>
               <section>
                   <Tabs defaultActiveKey="1">
                        <TabPane tab="阅读" key="1">{read}</TabPane>
                        <TabPane tab="连载" key="2">{lianzai}</TabPane>
                        <TabPane tab="问答" key="3"> {wenda}</TabPane>
                    </Tabs>

                   
               </section>
            </div>
        )
    }
}