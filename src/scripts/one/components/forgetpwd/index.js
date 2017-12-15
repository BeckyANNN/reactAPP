import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
export default class One extends Component{
    render(){
        return(
            <div className="login">
                <header>
                    <i className="iconfont icon-fanhui" onClick={()=>{hashHistory.goBack();}}></i>
                    <h1>重置密码</h1>
                </header>
                <section>
                    <div className="inp">
                        <label>
                            <i className="iconfont icon-wo"></i>
                            <input placeholder="手机号码"/>
                        </label>
                        <label className="confirm">
                            <i className="iconfont icon-wo"></i>
                            <input placeholder="验证码"/>
                            <span>获取验证码</span>
                        </label>
                        <label className="pwd">
                            <i className="iconfont icon-mima"></i>
                            <input placeholder="密码"/>
                        </label>
                        <label>
                            <i className="iconfont icon-mima"></i>
                            <input placeholder="确认密码"/>
                        </label>
                    </div>
                    <button>确认</button>
                    
                </section>
            </div>
        )
    }
}