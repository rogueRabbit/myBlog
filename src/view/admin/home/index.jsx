import React, { Component } from 'react';
import {  Form } from 'antd';

import NormalLoginForm from './loginForm/index';
import './index.scss';

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
class Home extends Component {
    render() {
        return (
            <div className="homeContainer">
                <div className="homeContent">
                    <h4 className="title">管理后台登录</h4>
                    <div className="formWrap">
                        <WrappedNormalLoginForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;