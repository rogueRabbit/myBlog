import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header/index';
import Nav from './components/Nav/index';
import Main from './view/index/index';
import Footer from './components/Footer/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Nav></Nav>
        <Main></Main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
