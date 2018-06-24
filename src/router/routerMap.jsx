import React, { Component } from 'react';
import { Router, Route, hashHistory} from 'react-router';
import App from '../../src/App';
import Article from '../view/article/index';

class RouterMap extends Component {

    updateHandle(){
        console.log('111');
    }

    render(){

        return (

            <Router history={hashHistory}>
                <Route path="/" component={App}/>
                <Route path="/article" component={Article}/>
            </Router>
        )
    }
}

export default RouterMap;