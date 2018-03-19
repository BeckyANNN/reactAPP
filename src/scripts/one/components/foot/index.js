import React,{Component} from "react"
import {Link} from "react-router"
import {connect} from "react-redux"
import { width } from "window-size";


@connect(
    (state)=>({footList:state.footList})
)
export default class Foot extends Component{
    
    render(){
        return(
            <div className="foot">
                {
                    this.props.footList.map((item,i)=>{
                        return(
                            <Link key={i} to={item.path} activeClassName="active">
                                <i className={"iconfont "+item.icon}></i>
                                <span>{item.txt}</span>
                            </Link>
                        )
                    })
                }

               
            </div>
        )
    }
}