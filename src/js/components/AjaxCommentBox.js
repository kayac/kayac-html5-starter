import $ from "../AjaxWrapper"
import React from 'react';

export default React.createClass({
  loadComment:function(){
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache:false,
      success: (data)=>{
        this.setComments(data)
      },
      error:(xhr, status, err)=>{
        console.error(status, err.toString());
      },
    })
  },
  setComments:function(comments){
    this.setState({comments:comments})
  },
  getInitialState : function(){
    return {comments:[]}
  },
  componentDidMount:function(){
    this.loadComment();
    setInterval(this.loadComment, 1000); // taste bad. (magic number)
  },
  render:function(){
    return(
      <div className='commentBox'>
        <CommentList comments={this.state.comments}/>
        <CommentForm setComments={this.setComments} url={this.props.url}/>
      </div>
    )
  }
})

const CommentList = React.createClass({
  render(){
    const commentNodes = this.props.comments.map(function(val, index){
      return (
        <Comment text={val} key={index}/> // key is required.
      )
    })
    return(
      <div>
        {commentNodes}
      </div>
    )
  }
})

const Comment = React.createClass({
  render() {
    return(
      <div className='comment'>
        {this.props.text}
      </div>
    );
  }
});

const CommentForm = React.createClass({
  postComment:function(comment){
    $.ajax({
      url: this.props.url,
      type: "POST",
      dataType: "json",
      data:comment,
      success: function(data){
        this.props.setComments(data);
      }.bind(this),
    })
  },
  handleChange(e){
    this.setState({comment :e.target.value});
  },
  handleClick(e){
    this.postComment(this.state.comment);
  },
  getInitialState : function(){
    return {comment:"hello"}
  },
  render(){
    return (
      <div>
        <input type="text" value={this.state.comment} onChange={this.handleChange}/>
        <input type="button" value="say" onClick={this.handleClick}/>    
      </div>
    )
  }
})