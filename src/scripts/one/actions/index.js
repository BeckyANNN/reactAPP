import axios from "axios";
import {hashHistory} from "react-router"
import {connect} from "react-redux"

/* axios.defaults.baseURL = "http://39.106.19.127:3000"; */
axios.defaults.baseURL = "http://localhost:3000";
export function get_one(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_one_success",json})
        })
}
//返回
export function get_back(dispatch){
    return dispatch({type:"get_back",hashHistory})
}
//退出登录
export function get_exit(dispatch){
    return dispatch({type:"get_exit",hashHistory})
}


//根据时间获取oneStory
export function get_date_oneStory(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_date_oneStory",json})
        })
}
//查询cover表
export function get_cover(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_cover",json})
        })
}
//插入点赞
export function insert_like(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;

        })
        .then(json=>{
            return dispatch({type:"insert_like",json})
        })
}
export function get_banner(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_banner_success",json})
        })
}

export function get_all(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_all_success",json})
        })
}

//根据id获取文章详情
/* export function get_detail(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_detail",json})
        })
} */
//获取详细信息
export function get_detail(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_detail",json})
        })
}

export function get_user_detail(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_user_detail",json})
        })
}

export function get_insert_detail(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_insert_detail",json})
        })
}




//更新点赞状态
export function get_update_detail(id,dispatch){
    return {type:"get_update_detail",id}

}
//更新收藏状态
export function get_update_collection(id,dispatch){
    return {type:"get_update_collection",id}
}

export function get_one_detail(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_one_detail",json})
        })
}

export function get_comment_detail(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_comment_detail",json})
        })
}

//根据id查找one
export function get_one_item(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_one_item",json})
        })
}
//根据id查询all页面的详细信息
export function get_all_detail(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_all_detail",json})
        })
}

//插入评论
export function get_insert_comment(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;

        })
        .then(json=>{
            return dispatch({type:"get_insert_comment",json})
        })
}


//插入收藏
export function get_insert_collection(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;

        })
        .then(json=>{
            return dispatch({type:"get_insert_collection",json})
        })
}

//查询收藏列表
export function get_find_collection(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;

        })
        .then(json=>{
            return dispatch({type:"get_find_collection",json})
        })
}

//通过用户查询收藏列表
export function find_one_collection(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;

        })
        .then(json=>{
            return dispatch({type:"find_one_collection",json})
        })
}

//插入点赞
/* export function insert_like(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;

        })
        .then(json=>{
            return dispatch({type:"insert_like",json})
        })
} */
//更新点赞
export function update_like(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;

        })
        .then(json=>{
            return dispatch({type:"update_like",json})
        })
} 
//根据id查询用户是否点赞
export function find_like(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"find_like",json})
        })
}
//查询所有点赞信息
export function find_all_like(url,dispatch){
    
    return axios.get(url)
        .then(res=>{
            return res.data;

        })
        .then(json=>{
            return dispatch({type:"find_all_like",json})
        })
    }