import React, { Component } from 'react';
import { Router, Route, hashHistory} from 'react-router';
import App from '../../src/App';
import Article from 'view/article/index';
import Home from 'view/admin/home/index';
import HomeLayout from 'view/admin/layout/index';
import UserManager from 'view/admin/user/index';
import LabelManager from 'view/admin/label/index';
import ArticleManager from 'view/admin/article/index';

class RouterMap extends Component {

    updateHandle(){
        console.log('111');
    }

    render(){

        return (

            <Router history={hashHistory}>
                <Route path="/" component={App}/>
                <Route path="/article" component={Article}/>
                <Route path="/home" component={Home}/>
                <Route component={HomeLayout}>
                    <Route path="/userManager" component={UserManager}></Route>
                    <Route path="/labelManager" component={LabelManager}></Route>
                    <Route path="/articleManager" component={ArticleManager}></Route>
                </Route>
            </Router>
        )
    }
}

export default RouterMap;