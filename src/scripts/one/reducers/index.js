var initState = {
    footList:[
        {path:"/one",txt:"ONE",icon:"icon-yuan"},
        {path:"/all",txt:"ALL",icon:"icon-fenlei"},
        {path:"/me",txt:"ME",icon:"icon-wo"},
    ],
    name:"",
    pwd:"",
    one:[],
    banner:[],
    list:[],
    detailList:null,
    userList:[],
    oneList:[],
    commentList:[],
    oneItem:[],
    collection:[],
    userCollection:[],
    flag:''
    
}
export default (state=initState,action)=>{
    switch(action.type){
        case "get_one_success":
        state.one = action.json;
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

        case "get_detail_success":
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

        case "get_update_detail":
        state.one = state.one.map((item,id)=>{
           if(action.id==item.id){ 
               item.like_detail.like = !item.like_detail.like;

               state.flag = item.like_detail.like
               if(item.like_detail.like){
                item.like_count++;
                
               }else{
                item.like_count--;

               }
           }
           return item;
        })
        return Object.assign({},state);
        break;

        //更新one的点赞
        case "get_one_detail":
        state.oneList = action.json;
        return Object.assign({},state);
        break;

        case "get_comment_detail":
        state.commentList = action.json;
        return Object.assign({},state);
        break;


        case "get_insert_comment":
        return Object.assign({},state);
        break;

        

       


        case "get_one_item":
        state.oneItem = action.json;
        return Object.assign({},state);
        break;


        case "get_insert_collection":
        return Object.assign({},state);
        break;


        case "get_find_collection":
        state.collection = action.json;
        return Object.assign({},state);
        break;

        case "find_one_collection":
        state.userCollection = action.json;
        return Object.assign({},state);
        break;


        default:
        return Object.assign({},state);
        break;
    }
}