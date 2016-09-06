import $ from "jquery"

const comments = ["hoge", "hoge", "hoge"];
export default {
  ajax(opts){
    if(opts.url == "debug_commentbox"){
      if(opts.type == "POST"){
        comments.push(opts.data);
        setTimeout(function(){
          opts.success(comments)}, 200);
      }else{
        setTimeout(function(){
          opts.success(comments)}, 200);
      }
    }else{
      $.ajax(opts);
    }
  },
}