import React from 'react';

// ES6 classes cause bind hell. You should use React.createClass() .
export default class CommentBox extends React.Component {
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
        This is Comment Page (React with ES6 class)!
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