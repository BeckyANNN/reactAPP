import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import {connect} from "react-redux"

import {find_one_collection} from "../../actions";

import none from "../../../../assets/images/none.png";
@connect(
    (state)=>({...state})
)


export default class Article extends Component{
   
   componentWillMount(){
       const {dispatch} = this.props;
       var name = localStorage.getItem("name"); 
       dispatch(find_one_collection("/oneCollection?username="+name,dispatch));
   }
   change=(e)=>{
       var active = document.querySelectorAll(".active");
       for(var i=0; i<active.length; i++){
           active[i].className = "";
       }
       e.target.className = "active";
       this.refs.read.style.display = "block";
       this.refs.change.style.display = "none";
       this.refs.lianzai.style.display = "none";
       this.refs.wenda.style.display = "none";
       
   }
   lianzai=(e)=>{
        var active = document.querySelectorAll(".active");
        for(var i=0; i<active.length; i++){
            active[i].className = "";
        }
        e.target.className = "active";
        this.refs.read.style.display = "none";
        this.refs.wenda.style.display = "none";
        if(this.props.userCollection){
            this.refs.lianzai.style.display = "block";
        }else{
            this.refs.change.style.display = "block";
        }
        
       
   }
   wenda=(e)=>{
    var active = document.querySelectorAll(".active");
    for(var i=0; i<active.length; i++){
        active[i].className = "";
    }
    e.target.className = "active";
    this.refs.read.style.display = "none";
    this.refs.change.style.display = "block";
    this.refs.lianzai.style.display = "none";
    if(this.props.userCollection){
        this.refs.wenda.style.display = "block";
    }else{
        this.refs.change.style.display = "block";
    }
   } 

   
    render(){
        const {userCollection} = this.props;
        var read = null;
        var lianzai = null;
        var wenda = null;
        if(userCollection){
            console.log(userCollection);
            read=(
                <div className="read" ref="read">
                    {
                        userCollection.map((item,i)=>{
                            if(item.type=="阅读"||item.type=="阅读 "){
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
                <div className="read" ref="lianzai" style={{display:'none'}}>
                    {
                        userCollection.map((item,i)=>{
                            if(item.type=="连载"||item.type=="连载 "){
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
                <div className="read" ref="wenda" style={{display:'none'}}>
                    {
                        userCollection.map((item,i)=>{
                            if(item.type=="问答"||item.type=="问答 "){
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
                   <div className="nav">
                        <a href="javascript:void(0);" className="active" onClick={this.change}>阅读</a>
                        <a href="javascript:void(0);" onClick={this.lianzai}>连载</a>
                        <a href="javascript:void(0);" onClick={this.wenda}>问答</a>
                   </div>
                   {read}
                   {lianzai}
                   {wenda}
                    <div className="change" ref="change">
                        <img src={none}/>
                    </div>
               </section>
            </div>
        )
    }
}