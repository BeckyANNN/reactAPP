import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import axios from "axios"
import {connect} from "react-redux"

axios.defaults.baseURL = "http://39.106.19.127:3000"
// axios.defaults.baseURL = "http://localhost:3000";
// import { Popconfirm, message,Button } from 'antd';

import   "../../../utils/layer/mobile/layer.js"
import {get_back} from "../../actions";

@connect(
    state=>state
)
export default class One extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            pwd:"",
            rpwd:"",
            display1:"none",
            display2:"none",
            display3:"none",
            flag:false,
            color:"",
            bgColor:"",
            disabled:true
        }
    }
    //验证用户名
    handleName=()=>{
        var reg=/^1[34578]\d{9}$/;
        if(reg.test(this.refs.name.value)){
            this.setState({
                name:this.refs.name.value,
                display1:"none",
                flag:true
            })
        }else{
            this.setState({
                display1:"inline-block",
                flag:false
            })
        }
    }
    //验证密码
    handlePwd=(e)=>{
        var reg=/^\d{6,10}$/;
        this.setState({
            pwd:e.target.value
        })
        if(reg.test(e.target.value)){
            this.setState({
                display2:"none",
                flag:true
            })
        }else{
            this.setState({
                display2:"inline-block",
                flag:false
            })
        }
    }
    //确认密码
    change=()=>{
        var telreg=/^1[34578]\d{9}$/;
        var pwdreg=/^\d{6,10}$/;
        //确认密码
        if(this.refs.pwd.value==this.refs.comfirm.value){
            this.setState({
                display3:"none",
                flag:true
            })
        }else{
            this.setState({
                display3:"inline-block",
                flag:false
            })
        }
        if(telreg.test(this.refs.name.value)&&pwdreg.test(this.refs.pwd.value)&&(this.refs.pwd.value==this.refs.comfirm.value)){
            this.setState({
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

    register=(e)=>{
        if(this.state.flag){
            axios.post("/register",{
                phone:this.state.name,
                pwd:this.state.pwd
            }).then(res=>{
                if(res.data=="0"){
                    layer.open({
                        content: '用户名被占用'
                        ,style: 'background-color:#ddd; color:orange; border:none;font-size:28px' //自定风格
                        ,time: 2
                      });
                }else{
                    hashHistory.push("/login"); 
                }
            })
                   
        }
        
    }
    confirm(e) {
        message.success('Click on Yes');
      }
      cancel(e) {
        message.error('Click on No');
      }
    render(){  
       const {dispatch} = this.props;
        return(
            <div className="login">
                <header>
                    <i className="iconfont icon-fanhui" onClick={()=>{dispatch(get_back(dispatch))}}></i>
                    <h1>注册</h1>
                </header>
                <section>
                    <div className="inp">
                        <label>
                            <i className="iconfont icon-wo"></i>
                            <input placeholder="手机号码" onInput={this.handleName} ref="name"/>
                            <span style={{display:this.state.display1}}>格式错误</span> 
                        </label>
                        <label className="pwd">
                            <i className="iconfont icon-mima"></i>
                            <input placeholder="密码" onInput={this.handlePwd} ref="pwd"/>
                            <span style={{display:this.state.display2}}>格式错误</span> 
                        </label>
                        <label>
                        <i className="iconfont icon-mima"></i>
                            <input placeholder="确认密码" onInput={this.change} ref="comfirm"/>
                            <span style={{display:this.state.display3}}>两次密码不一致</span> 
                        </label>
                    </div>
                     <button style={{color:this.state.color,backgroundColor:this.state.bgColor}} onClick={this.register} disabled={this.state.disabled}>注册</button> 
                   
                </section>
            </div>
        )
    }
}