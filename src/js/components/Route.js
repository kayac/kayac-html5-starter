import Header from "./Header"
import Footer from "./Footer"
import TopPage from "./TopPage"
import CommentBox from "./CommentBox"
import AjaxCommentBox from "./AjaxCommentBox"
import AjaxDiagnosis from "./AjaxDiagnosis"
import React from 'react';

export default React.createClass ({
  render() {
    return(
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );  // must be wrapped in an enclosing tag
  }
})

const Main = React.createClass ({
  getInitialState : function(){
    return {scene : "Top"}
  },
  changeScene(next_scene){
    // this.state.scene = "Comment"     //← bad example. 
    this.setState({"scene":next_scene}); //← good.
  },
  render() {
    switch(this.state.scene){
      case "Top":
        return(
          <TopPage changeScene={this.changeScene}/>
        )
      case "Comment":
        return(
          <CommentBox/>
        )
      case "AjaxComment":
        return(
          <AjaxCommentBox url="debug_commentbox"/>
        )
      case "AjaxDiagnosis":
        return(
          <AjaxDiagnosis interview_url="http://localhost:3002/api/interview" diagnosis_url="http://localhost:3002/api/diagnosis"/>
        )
    }
  }
})
