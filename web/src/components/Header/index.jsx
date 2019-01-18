import React, { Component } from 'react';
import headerLogo from '../../vendor/image/logo.png';
import './index.scss';


class Header extends Component {

    render(){

        return (
            <div className="main-header" >
                <div className="container">
                    <div className="row">
                        <div className="cols-sm-12">
                            <a className="branding">
                                <img src={headerLogo} alt="logo"/>
                            </a>
                            <h2 className="text-hide">Ghost 是一个简洁、强大的写作平台。你只须专注于用文字表达你的想法就好，其余的事情就让 Ghost 来帮你处理吧。</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header;
