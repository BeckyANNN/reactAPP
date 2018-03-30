import React,{Component} from "react"
import {render} from "react-dom"
import {hashHistory,Router,Route,IndexRedirect,Redirect} from "react-router"

import One from "./one"
import All from "./all"
import Me from "./me"
import App from "./app"
import Detail from "./detail"
import Login from "../components/login"
import Register from "../components/register"
import Forgetpwd from "../components/forgetpwd"

import Share from "../components/share"
import Search from "../components/search"
import Message from "../components/message"
import Xiaoxi from "../components/xiaoxi"
import Shezhi from "../components/shezhi"
import Article from "../components/article"
import Subject from "./subject"
export default class Layout extends Component{
    render(){
        return(
            <Router history={hashHistory}>
                {/* <Redirect from="/reactapp/dist" to="/" /> */}
                <Route path="/" component={App}>
                    <IndexRedirect to="/one"/>
                    <Route path="one" component={One}/>
                    <Route path="all" component={All}/>
                    <Route path="me" component={Me}/>
                    <Route path="login" component={Login}/>
                    <Route path="register" component={Register}/>
                    <Route path="forgetpwd" component={Forgetpwd}/>
                    <Route path="detail/:id" component={Detail}/>
                    <Route path="subject/:id" component={Subject}/>
                    <Route path="share" component={Share}/>
                    <Route path="search" component={Search}/>
                    <Route path="message" component={Message}/>
                    <Route path="xiaoxi/:type" component={Xiaoxi}/>
                    <Route path="shezhi" component={Shezhi}/>
                    <Route path="article/:type" component={Article}/>
                </Route>
            </Router>
        )
    }
}