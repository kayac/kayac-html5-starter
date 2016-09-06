import $ from "../AjaxWrapper"
import QuestionForm from "./QuestionForm"
import React from 'react';

export default React.createClass({
  getInitialState : function(){
    return {
      step : "top",
      result_text : "診断中（通信待ち）",
    }
  },
  showResult(user_answer_values){
    this.setState({
      step:"result"
    },function(){
      $.ajax({
        url: this.props.diagnosis_url,
        dataType: "json",
        cache:false,
        data: {user_answer_values : user_answer_values},
        success: (data)=>{
          console.log(data);
          this.setState(data);
        },
        error:(xhr, status, err)=>{
          console.error(status, err.toString());
        },
      })      
    });
  },
  render:function(){
    switch(this.state.step){
      case "top":
        return(
          <div className='diagnosis'>
            診断トップ
            <input type="button" value="ボタン" onClick={()=>{this.setState({step:"qa"});}}/>
          </div>
        )
      case "qa":
        return(
          <div className='diagnosis'>
            <QuestionForm showResult={this.showResult} url={this.props.interview_url}/>
          </div>
        )
      case "result":
        return(
          <div className='diagnosis'>
            {this.state.result_text}
          </div>
        )
    }
  }
})