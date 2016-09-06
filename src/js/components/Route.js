import Header from "./Header"
import Footer from "./Footer"
import Main from "./Main"
import React from 'react';

export default React.createClass ({
  render() {
    return(
      <div>
        <Header/>
        <Main url="http://localhost:3002"/>
        <Footer/>
      </div>
    );  // must be wrapped in an enclosing tag
  }
})

