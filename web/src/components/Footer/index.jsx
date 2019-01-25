import React from 'react';
import { Link } from 'react-router';
import './index.scss';

/**
 * footer只是一个函数式组件
 */
const Footer = () => {
    return (
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <span>贵有恒，何必三更起五更眠。最无益，只怕一日曝十日寒。</span> |
                        <span className="entry">
                            <Link to="/home">后台管理</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;