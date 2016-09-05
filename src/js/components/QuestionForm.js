import $ from "./Ajax"
import React from 'react';

export default React.createClass({
  getInitialState : function(){
    return {
      question_number:1,
      question:"読み込み中",
      answers:[],
      user_answer_value:null,
      user_answer_values:[],
    }
  },
  loadQuestion:function(){
    this.setState({
      question:"読み込み中",
      answers:[],
    })
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache:false,
      data: {q_num : this.state.question_number},
      success: function(data){
        this.setState(data);
      }.bind(this),
      error:function(xhr, status, err){
        console.error(status, err.toString());
      }.bind(this),
    })
  },
  next:function(){
    if(this.state.user_answer_value){
      this.setState({
        user_answer_value : null,
        user_answer_values : this.state.user_answer_values.concat(this.state.user_answer_value),
        question_number : this.state.question_number+1,
      }, function(){
        if(this.state.question_number <= 2){
          this.loadQuestion();
        }else{
          this.props.showResult(this.state.user_answer_values)
        }
      });
    }
  },
  setAnswerValue:function(val){
    this.setState({user_answer_value:val});
  },
  componentDidMount:function(){
    this.loadQuestion();
  },
  render:function(){
    return(
      <div className="questionForm">
        <Question text={this.state.question}/>
        <AnswerArea texts={this.state.answers} name="hoge" onChange={this.setAnswerValue}/>
        <NextButton value="次へ" onClick={this.next}/>
      </div>
    )
  }
})

const Question = React.createClass({
  render:function(){
    return(
      <div className="question">
        {this.props.text}
      </div>
    )
  }
});

const AnswerArea = React.createClass({
  render(){
    const optionNodes = this.props.texts.map((val, index)=>{
      return (
        <Option text={val} key={index} index={index} name={this.props.name} onChange={this.props.onChange}/> // key is required.
      )
    })
    return(
      <form className="answer_area" name={this.props.name}>
        {optionNodes}
      </form>
    )
  }
})

const Option = React.createClass({
  handleChange(e){
    if(e.target.checked){
      this.props.onChange(this.props.text);
    }
  },
  render(){
    return (
      <label className="option">
        <input type="radio" onChange={this.handleChange} name={this.props.name}/>
        {this.props.text}
      </label>
    )
  }
})

const NextButton = React.createClass({
  handleClick(){
    this.props.onClick();
  },
  render(){
    return (
      <input type="button" value={this.props.value} onClick={this.handleClick}/>
    )
  }
})