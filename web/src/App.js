import React, { Component } from 'react';
import Header from 'component/Header/index';
import Nav from 'component/Nav/index';
import Footer from 'component/Footer/index';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Nav/>
        <section className="content-wrap">
          <div className="container">
            {
                this.props.children
            }
          </div>  
        </section>
        <Footer/>
      </div>
    );
  }
}

export default App;
