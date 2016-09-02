import React from 'react';

export default class TopPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); // You must bind "this" in ES6 class.
  }

  handleClick(e){
    this.props.changeScene(e.target.value);
  }

  render() {
    return(
      <div>
        This is TopPage!
        <input type="button" value="Comment" onClick={this.handleClick}/>
        <input type="button" value="AjaxComment" onClick={this.handleClick}/>
      </div>
    );
  }
}