
var app = document.getElementById("app");

import React from "react"

import {render} from "react-dom"
import store from "./store"

import Layout from "./containers"

import {Provider} from "react-redux"

import "./containers"

var hotRender = ()=>{
    render(
       <Provider store={store}>
            <Layout/>
       </Provider>,
        app
    )
}

hotRender()