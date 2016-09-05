import React from 'react';

export default React.createClass ({
  handleClick(e){
    this.props.changeScene(e.target.value);
  },
  render() {
    return(
      <div>
        This is TopPage!
        <input type="button" value="Comment" onClick={this.handleClick}/>
        <input type="button" value="AjaxComment" onClick={this.handleClick}/>
        <input type="button" value="AjaxDiagnosis" onClick={this.handleClick}/>
      </div>
    );
  }
})