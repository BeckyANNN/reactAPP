import React,{Component} from "react"
import {Link,hashHistory} from "react-router"

import Foot from "../../components/foot"
import axios from "axios"
import touxiang from "../../../../assets/images/touxiang.jpg"
import PicturesWall from "../../components/picturesWall";
import {change_img} from "../../actions";
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "http://39.106.19.127:3000"
import   "../../../utils/layer/mobile/layer.js"
export default class Me extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:true,
            fileList:[],
            imgUrl:localStorage.img
        }
    }
    componentDidMount(){
        if(localStorage.getItem("name")){
            this.refs.me.style.background="white";
        }else{
            
        }
        /* axios.get("/findUser?phone="+localStorage.name).then(res=>{
            this.setState({
                imgUrl:res.data.img
            })
        }) */
    }
    handleOk=()=>{
        this.setState({
            flag:false
        })
    }
    handleUpload=()=>{
        if(this.state.imgReUrl){
            axios.post("/updateImg",{
                phone:localStorage.name,
                img:this.state.imgReUrl
            })
            setTimeout(()=>{
                localStorage.setItem("img",this.state.imgReUrl);
                this.setState({
                    imgUrl:this.state.imgReUrl
                })
                location.reload(true)
            },1000)
            
        }else{
            layer.open({
                content: '请选择要修改的头像'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
              });
        }
        
        
    }
    getValue=(value)=>{
        this.setState({
            imgReUrl:value[0]?value[0].thumbUrl:""
        })
        //localStorage.setItem("img",value[0].thumbUrl)
    }
    render(){
        const {imgUrl} = this.state;
        return(
            <div className="me" ref="me">
                <div className={localStorage.getItem("name")?"hide":"show showIn"}>
                    <div className="info">
                        <Link to="/login"/>
                        <p>点击登录</p>
                    </div>
                </div>
                <div className={localStorage.getItem("name")?"show showIn":"hide"}>
                
                    <div className="login-info">
                        <i className="iconfont icon-shezhi" onClick={()=>{hashHistory.push('/shezhi')}}></i>
                        <i className="iconfont icon-xinxi" onClick={()=>{hashHistory.push('/message')}}></i>
                       
                       <div className={this.state.flag?"show touxiang":"hide"}>
                           <img src={imgUrl} onClick={this.handleOk}/>
                           <p>{localStorage.getItem("name")}</p>
                       </div>
                       <div className="touxiang" className={this.state.flag?"hide":"show"}>
                           <PicturesWall getValue={this.getValue}></PicturesWall>
                           <div className="btn">
                                <button onClick={()=>{this.setState({flag:true,fileList:[]})}}>取消</button>
                                <button onClick={this.handleUpload}>确定</button>
                           </div>
                       </div>
                       <a href="#" className="ji"></a>
                       
                    </div>
                    <div className="list">
                        <div className="list-main">
                            <div className="item">
                                <h2>我的收藏</h2>
                                {/* <div className="dlist" onClick={()=>{hashHistory.push('/xiaoxi/图文')}}>
                                    <i className="iconfont icon-tuwen"></i>
                                    <span>图文</span>
                                </div> */}
                                <div className="item-main">
                                    <div className="dlist" onClick={()=>{hashHistory.push('/article/文章')}}>
                                        <i className="iconfont icon-wenzhang"></i>
                                        <span>文章</span>
                                    </div>
                                    <div className="dlist" onClick={()=>{hashHistory.push('/xiaoxi/音乐')}}>
                                        <i className="iconfont icon-yinyue"></i>
                                        <span>音乐</span>
                                    </div>
                                    <div className="dlist" onClick={()=>{hashHistory.push('/xiaoxi/影视')}}>
                                        <i className="iconfont icon-shipinbofangyingpian2"></i>
                                        <span>影视</span>
                                    </div>
                                    <div className="dlist" onClick={()=>{hashHistory.push('/xiaoxi/电台')}}>
                                        <i className="iconfont icon-diantai"></i>
                                        <span>电台</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="list-main">
                            <div className="list-item">
                                <div className="left">
                                    <i className="iconfont icon-wode"></i>
                                    <span>我的关注</span>
                                </div>
                                <div className="right" onClick={()=>{hashHistory.push('/xiaoxi/我的关注')}}>
                                    <span>0</span>
                                    <i className="iconfont icon-gengduo"></i>
                                </div>
                            </div>
                        </div>
                        {/* <div className="list-main">
                            <div className="list-item">
                                <div className="left">
                                    <i className="iconfont icon-yinyue"></i>
                                    <span>歌单</span>
                                </div>
                                <div className="right" onClick={()=>{hashHistory.push('/xiaoxi/我的歌单')}}>
                                    <span>0</span>
                                    <i className="iconfont icon-gengduo"></i>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <Foot/>
            </div>

        )
    }
}