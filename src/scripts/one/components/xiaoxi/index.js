import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import {connect} from "react-redux"

import none from "../../../../assets/images/none.png";
import {find_one_collection} from "../../actions";
@connect(
    (state)=>({...state})
)
export default class Xiaoxi extends Component{

    componentWillMount(){
        const {dispatch} = this.props;
        var name = localStorage.getItem("name"); 
        dispatch(find_one_collection("/oneCollection?username="+name,dispatch));
    }

    render(){
        const {userCollection} = this.props;
        let cont = null;
        let cont2 = <img src={none}/>
        if(userCollection.length>0){
            cont=(
                <div className="read">
                    {
                        userCollection.map((item,i)=>{
                            if(item.content_type=="4"&&this.props.params.type=="音乐"){
                                return(
                                    <div className="read-list" key={i}> 
                                        <Link to={"/detail/"+item.item_id}>
                                            <dl>
                                                <dt><img src={item.cover}/></dt>
                                                <dd>
                                                    <p>{item.title}</p>
                                                    <p>{item.author.user_name}</p>
                                                </dd>
                                            </dl>
                                        </Link>
                                    </div>
                                    )
                            }else if(item.content_type=="5"&&this.props.params.type=="影视"){
                                return(
                                    <div className="read-list" key={i}> 
                                        <Link to={"/detail/"+item.item_id}>
                                            <dl>
                                                <dt><img src={item.cover}/></dt>
                                                <dd>
                                                    <p>{item.title}</p>
                                                    <p>{item.author.user_name}</p>
                                                </dd>
                                            </dl>
                                        </Link>
                                    </div>
                                )
                            }else if(item.content_type=="6"&&this.props.params.type=="电台"){
                                return(
                                    <div className="read-list" key={i}> 
                                        <Link to={"/detail/"+item.item_id}>
                                        <dl>
                                                <dt><img src={item.cover}/></dt>
                                                <dd>
                                                    <p>{item.title}</p>
                                                    <p>{item.author.user_name}</p>
                                                </dd>
                                            </dl>
                                        </Link>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            );
        }
        return(
            <div className="xiaoxi">
               <header>
                   <div className="main">
                    <i className="iconfont icon-fanhui" onClick={()=>{hashHistory.go(-1)}}></i>
                    <h1>{this.props.params.type}</h1>
                   </div>
               </header>
               <section>
                   {cont}
               </section>
            </div>
        )
    }
}