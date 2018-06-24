import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';

class Nav extends Component {

    render(){

        return (

            <nav className="main-navigation">
                <div className="container">
                    <div className="row">
                        <div className="cols-sm-12">
                            <div className="navbar-header">
                                <span className="nav-toggle-button collapsed" data-toggle="collapse" data-target="#main-menu">
                                    <span className="sr-only">Toggle navigation</span>
                                    <i className="fa fa-bars"></i>
                                </span>
                            </div>
                            <div className="collapse navbar-collapse" id="main-menu">
                                <ul className="menu">
                                    <li className="nav-current" role="presentation">
                                        <Link to="/">首页</Link>
                                    </li>
                                    <li role="presentation">
                                        <a>论坛</a>
                                    </li>
                                    <li role="presentation">
                                        <a>快捷手册</a>
                                    </li>
                                    <li role="presentation">
                                        <a>中文文档</a>
                                    </li>
                                    <li role="presentation">
                                        <a>下载</a>
                                    </li>
                                    <li role="presentation">
                                        <a>关于</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

}

export default Nav