import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import {connect} from "react-redux"


import none from "../../../../assets/images/none.png";
import { get_exit } from "../../actions/index";
import   "../../../utils/layer/mobile/layer.js";

@connect(
    // (state)=>({...state})
    state=>state
)
export default class Shezhi extends Component{
    removeStorage=()=>{
        layer.open({
            content: '消除成功',
            skin: 'msg',
            time: 2 //2秒后自动关闭
          });
    }
    render(){
        const {dispatch} = this.props;
        return(
            <div className="shezhi">
               <header>
                   <div className="main">
                    <i className="iconfont icon-fanhui" onClick={()=>{hashHistory.go(-1)}}></i>
                    <h1>设置</h1>
                   </div>
               </header>
               <section>
                   <div className="list">
                       <h3>设置</h3>
                       <div className="item">
                           <div className="item-main">
                               <p>夜间模式</p>
                               <input type="checkbox" /> 
                              
                           </div>
                       </div>
                       <div className="item">
                           <div className="item-main">
                               <p>流量播放提醒</p>
                               <input type="checkbox" /> 
                              
                           </div>
                       </div>
                       <div className="item">
                           <div className="item-main" onClick={this.removeStorage}>
                               <p>清除缓存</p>
                               <i className="iconfont icon-gengduo"></i>
                           </div>
                       </div>
                   </div>
                   <div className="list">
                       <h3>反馈</h3>
                       <div className="item">
                           <div className="item-main">
                               <p>意见与反馈</p>
                               <i className="iconfont icon-gengduo"></i>
                              
                           </div>
                       </div>
                       <div className="item">
                           <div className="item-main">
                               <p>关注我们</p>
                               <i className="iconfont icon-gengduo"></i>
                              
                           </div>
                       </div>
                       <div className="item">
                           <div className="item-main">
                               <p>给一个评分</p>
                               <i className="iconfont icon-gengduo"></i>
                              
                           </div>
                       </div>
                   </div>
                   <div className="list">
                       <h3>关于</h3>
                       <div className="item">
                           <div className="item-main">
                               <p>用户协议</p>
                               <i className="iconfont icon-gengduo"></i>
                              
                           </div>
                       </div>
                       <div className="item">
                           <div className="item-main">
                               <p>版本号</p>
                               <i>4.3.4</i>
                              
                           </div>
                       </div>
                       
                   </div>
                   <div className="list">
                       <h3></h3>
                       <div className="item">
                           <div className="item-main">
                               <p onClick={()=>{dispatch(get_exit(dispatch))}}>退出登录</p>                           
                           </div>
                       </div>
                      
                   </div>
               </section>
            </div>
        )
    }
}