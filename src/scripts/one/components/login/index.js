import React,{Component} from "react"
import {Link,hashHistory} from "react-router"
import   "../../../utils/layer/mobile/layer.js"
import axios from "axios"
import {connect} from "react-redux"
import {Alert} from "antd"
//import {get_insert_detail} from "../../actions";

import {get_back} from "../../actions";
/* axios.defaults.baseURL = "http://39.106.19.127:3000" */
axios.defaults.baseURL = "http://localhost:3000";
@connect(
    state=>state
)
export default class One extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            pwd:"",
            bgColor:"#dddddd",
            disabled:true
        }
    }

    
    submit=()=>{
      
        axios.get("/findUser?phone="+this.state.name).then(res=>{
            if(this.state.pwd==res.data.pwd){
                localStorage.setItem("name",this.state.name);
                hashHistory.push("/one");
               
            }else{
                layer.open({
                    content: '用户名或密码错误'
                    ,style: 'background-color:#ddd; color:orange; border:none;font-size:28px' //自定风格
                    ,time: 2
                  });
            }
        })
    }
   
 

    change=()=>{
        var telreg=/^1[34578]\d{9}$/;
        var pwdreg=/^\d{6,10}$/;
        if(telreg.test(this.refs.name.value)&&pwdreg.test(this.refs.pwd.value)){
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

    render(){
        const {dispatch} = this.props;
        return(
            <div className="login">
                <header>
                    <i className="iconfont icon-fanhui" onClick={()=>{dispatch(get_back(dispatch))}}></i>
                    <h1>登录</h1>
                </header>
                <section>
                    <div className="inp">
                        <label>
                            <i className="iconfont icon-wo"></i>
                            <input placeholder="手机号码" onInput={this.change} ref="name"/>
                             
                        </label>
                        <label>
                        <i className="iconfont icon-mima"></i>
                            <input placeholder="密码" onInput={this.change} ref="pwd"/>
                        </label>
                    </div>
                    <button onClick={this.submit} style={{color:this.state.color,backgroundColor:this.state.bgColor}} disabled={this.state.disabled}>登录</button>
                    <div className="del">
                        <Link to="/register">免费注册</Link>
                        <Link to="/forgetpwd">忘记密码</Link>
                    </div>
                </section>
            </div>
        )
    }
}