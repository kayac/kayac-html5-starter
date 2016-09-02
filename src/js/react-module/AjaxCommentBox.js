import React from 'react';

export default class AjaxCommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:["hoge", "hoge", "hoge"]
    }
    this.addComment = this.addComment.bind(this); // You must bind "this" in ES6 class.
  }

  addComment(comment){
    this.setState({
      comments:this.state.comments.concat(comment)
    });
  }

  render() {
    const commentNodes = this.state.comments.map(function(val, index){
      return (
        <Comment text={val} key={index}/> // key is required.
      )
    })
    return(
      <div className='commentBox'>
        [Under Construction]
        #Now this page is same as CommentBox.
        {commentNodes}
        <CommentForm addComment={this.addComment}/>
      </div>
    );
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='comment'>
        {this.props.text}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment :"hello",      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e){
    this.setState({comment :e.target.value});
  }

  handleClick(e){
    this.props.addComment(this.state.comment);
  }

  render(){
    return (
      <div>
        <input type="text" value={this.state.comment} onChange={this.handleChange}/>
        <input type="button" value="say" onClick={this.handleClick}/>    
      </div>
    )
  }
}