import React, { Component } from 'react';
import { Router, Route, hashHistory} from 'react-router';
import { message } from 'antd';
import { cookie } from 'cookie_js';
import App from '../../src/App';
import Article from 'view/front/article/index';
import Index from 'view/front/index/index';
import Home from 'view/admin/home/index';
import HomeLayout from 'view/admin/layout/index';
import UserManager from 'view/admin/user/index';
import LabelManager from 'view/admin/label/index';
import ArticleManager from 'view/admin/article/index';
import AboutUs from 'view/front/aboutUs/index';
import Note from 'view/front/note/index';


class RouterMap extends Component {


    render(){

        const authRequired = (nextState, replace) => {
            if (cookie.get('isLogin') !== '1') { // 路由跳转之前，判断用户是否已经登录
                message.error('对不起，未检测到您的登录态，请先去登录!', 2);
                replace('/');
            }
        
            // 后续继续根据用户的权限来判断用户是否能访问某些页面
            window.scrollTo(0, 0);
        };

        return (
            <Router history={hashHistory}>
                <Route path="/home" component={Home}/>
                <Route component={App}>
                    <Route path="/" component={Index}/>
                    <Route path="/article" component={Article}/>
                    <Route path="/aboutUs" component={AboutUs}/>
                    <Route path="/note" component={Note}/>
                </Route>
                <Route component={HomeLayout}>
                    <Route path="/userManager" component={UserManager} onEnter={authRequired}></Route>
                    <Route path="/labelManager" component={LabelManager} onEnter={authRequired}></Route>
                    <Route path="/articleManager" component={ArticleManager} onEnter={authRequired}></Route>
                </Route>
            </Router>
        )
    }
}

export default RouterMap;