import Header from "./Header"
import Footer from "./Footer"
import TopPage from "./TopPage"
import CommentBox from "./CommentBox"
import AjaxCommentBox from "./AjaxCommentBox"
import React from 'react';

export default class Route extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );  // must be wrapped in an enclosing tag
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scene : "Top",
    }
    this.changeScene = this.changeScene.bind(this); // You must bind "this" in ES6 class.
  }
  changeScene(next_scene){
    // this.state.scene = "Comment"     //← bad example. 
    this.setState({"scene":next_scene}); //← good.
  }
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
          <AjaxCommentBox/>
        )
    }
  }
}
