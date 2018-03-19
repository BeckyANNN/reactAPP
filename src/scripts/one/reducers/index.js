var initState = {
    footList:[
        {path:"/one",txt:"ONE",icon:"icon-yuan"},
        {path:"/all",txt:"ALL",icon:"icon-fenlei"},
        {path:"/me",txt:"ME",icon:"icon-wo"},
    ],
    one:[],
    banner:[],
    list:[],
    detailList:null, 
    userList:[],
    //oneList:[],
    commentList:[],
    oneItem:[],
    collection:[],
    userCollection:[],
    flag:'',
    likeInfo:"",
    likeAll:[],
    like:null,
    id:null
    
}
export default (state=initState,action)=>{
    switch(action.type){
        //获取首页数据
       case "get_one_success":
        state.one = action.json;
        return Object.assign({},state);
        break;

        /*返回*/
        case "get_back":
        action.hashHistory.go(-1);
        return Object.assign({},state);

        //退出登录
        case "get_exit":
        localStorage.removeItem("name");
        action.hashHistory.push("/me");
        return Object.assign({},state);

        //插入、更新点赞
        case "insert_like":
        return Object.assign({},state);
        break;

        case "get_banner_success":
        state.banner = action.json;
        return Object.assign({},state);
        break;

        case "get_all_success":
        state.list = action.json;
        return Object.assign({},state);
        break;

        //根据id获取文章详情
        case "get_detail":
        state.detailList = action.json;
        return Object.assign({},state);
        break;

        case "get_user_detail":
        state.userList = action.json;
        return Object.assign({},state);
        break;

        case "get_insert_detail":
        state.userList = action.json;
        return Object.assign({},state);
        break;

        //更新点赞状态
        case "get_update_detail":
        state.one = state.one.map((item,id)=>{
           if(action.id==item.id){ 
               item.like_detail.like = (!item.like_detail.like)*1;

               state.flag = item.like_detail.like
               if(item.like_detail.like*1){
                item.like_count++;
                
               }else{
                item.like_count--;

               }
           }
           return item;
        })
        return Object.assign({},state);
        break;

        //更新收藏状态
        case "get_update_collection":
        state.one = state.one.map((item,id)=>{
           if(action.id==item.id){ 
               item.like_detail.collection = (!item.like_detail.collection)*1;
               state.detailList = item;
           }
           return item;
        })
        return Object.assign({},state);
        break;

        //更新one的点赞
        case "get_one_detail":
        // state.oneList = action.json;
        // console.log(action.json);
        return Object.assign({},state);
        break;

        //获取评论列表
        case "get_comment_detail":
        state.commentList = [];
        action.json.map((item,index)=>{
            if(state.detailList){
                if(item['articleId']==state.detailList['id']){
                    if(state.commentList.indexOf(item)==-1){
                        state.commentList.push(item);
                    }
                }
            }
        })
        return Object.assign({},state);
        break;


        //插入评论
        case "get_insert_comment":
        return Object.assign({},state);
        break;

        

       


        case "get_one_item":
        state.oneItem = action.json;
        return Object.assign({},state);
        break;

        //插入评论
        case "get_insert_collection":
        console.log(action.json);
        return Object.assign({},state);
        break;


         /* case "get_find_collection":
        state.collection = action.json;
        return Object.assign({},state);
        break;

        case "find_one_collection":
        state.userCollection = action.json;
        return Object.assign({},state);
        break;
 */

         case "update_like":
        return Object.assign({},state);
        break; 

        case "find_like":
        state.likeInfo = action.json;
        
        return Object.assign({},state);
        return action.json;
        
        break;

        case "find_all_like":
        state.likeAll = action.json;
        
        return Object.assign({},state);
        break;

        default:
        return Object.assign({},state);
        break;
    }
}