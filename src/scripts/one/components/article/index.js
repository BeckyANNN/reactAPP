import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import {connect} from "react-redux"

import {find_one_collection} from "../../actions";

import {Tabs} from "antd";
const TabPane = Tabs.TabPane;

@connect(
    (state)=>({...state})
)


export default class Article extends Component{
   
   componentWillMount(){
       const {dispatch} = this.props;
       var name = localStorage.getItem("name"); 
       dispatch(find_one_collection("/oneCollection?username="+name,dispatch));
   }


   
    render(){
        const {one,userCollection} = this.props;
        var read = null;
        var lianzai = null;
        var wenda = null;
        if(userCollection.length>0){
            read=(
                <div className="read">
                    {
                        userCollection.map((item,i)=>{
                            if(item.content_type=="1"){
                                return(
                                    <div className="read-list" key={i}> 
                                    <div className="left">
                                        <i className="iconfont icon-wenzhang"></i>
                                        <p>{item.title}</p>
                                    </div>
                                    <Link to={"/detail/"+item.item_id}>
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
                <div className="read">
                    {
                        userCollection.map((item,i)=>{
                            if(item.content_type=="2"){
                                return(
                                    <div className="read-list" key={i}> 
                                    <div className="left">
                                    <i className="iconfont icon-wenzhang"></i>
                                        <p>{item.title}</p>
                                    </div>
                                    <Link to={"/detail/"+item.item_id}>
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
                <div className="read">
                    {
                        userCollection.map((item,i)=>{
                            if(item.content_type=="3"){
                                return(
                                    <div className="read-list" key={i}> 
                                    <div className="left">
                                        <i className="iconfont icon-wenzhang"></i>
                                        <p>{item.title}</p>
                                    </div>
                                    <Link to={"/detail/"+item.item_id}>
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