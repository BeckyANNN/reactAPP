import React,{Component} from "react"
import {Link,hashHistory} from "react-router";
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "http://39.106.19.127:3000";
export default class Forgetpwd extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            pwd:"",
            bgColor:"#dddddd",
            disabled:true
        }
    }
    //获取验证码
    getConfirm=()=>{
        this.refs.confirm.value = "123456"
    }
    change=()=>{
        var telreg=/^1[34578]\d{9}$/;
        var pwdreg=/^\d{6,10}$/;
        if(telreg.test(this.refs.name.value)&&pwdreg.test(this.refs.pwd.value)&&this.refs.confirm.value&&this.refs.rePwd.value==this.refs.pwd.value){
            this.setState({
                name:this.refs.name.value,
                pwd:this.refs.pwd.value,
                color:"white",
                bgColor:"#706d6d",
                disabled:false
                
            })
        }else{
            this.setState({
                color:"#aaaaaa",
                bgColor:"#dddddd"
            })
        }
    }
    //确认提交
    submit=()=>{
        axios.post("/update",{
            phone:this.state.name,
            pwd:this.state.pwd
        })
        hashHistory.push("/login");
    }
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
                            <input placeholder="手机号码" onInput={this.change} ref="name"/>
                        </label>
                        <label className="confirm">
                            <i className="iconfont icon-wo"></i>
                            <input placeholder="验证码" ref="confirm"/>
                            <span onClick={this.getConfirm}>获取验证码</span>
                        </label>
                        <label className="pwd">
                            <i className="iconfont icon-mima"></i>
                            <input placeholder="密码" onInput={this.change} ref="pwd"/>
                        </label>
                        <label>
                            <i className="iconfont icon-mima"></i>
                            <input placeholder="确认密码" onInput={this.change} ref="rePwd"/>
                        </label>
                    </div>
                    <button onClick={this.submit} style={{color:this.state.color,backgroundColor:this.state.bgColor}} disabled={this.state.disabled}>确认</button>
                </section>
            </div>
        )
    }
}