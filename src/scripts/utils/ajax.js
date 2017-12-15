
var $$ = (function(){
    var ajax =  function(type,url,callback){
        var xhr = new XMLHttpRequest();
        xhr.open(type,url,true);
        xhr.send();
        console.log(url);

        xhr.onreadystatechange = function(){
            console.log("ssssssssssssssssss")
            if(xhr.status==200&&xhr.readyState==4){
                // console.log(xhr.responseText);
                // eval
                callback(xhr.responseText)
            }
        }
    }

    return {
        http:ajax
    }
})();


export default $$;