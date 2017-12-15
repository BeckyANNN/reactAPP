import axios from "axios";
axios.defaults.baseURL = "http://39.106.19.127:3000";
/* axios.defaults.baseURL = "http://localhost:3000"; */
export function get_one(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_one_success",json})
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

export function get_detail(url,dispatch){
    return axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            return dispatch({type:"get_detail_success",json})
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





export function get_update_detail(id,dispatch){
    return {type:"get_update_detail",id}

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