import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import './index.scss';

class Nav extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            navList: [
                { title: '首页', link: '/', isSelect: true },
                { title: '文章归档', link: '/note', isSelect: false },
                { title: '关于我', link: '/aboutUs', isSelect: false },
            ]
        }
    }

    render(){
        let { navList } = this.state;
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
                                    {
                                        navList.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link to={item.link} activeClassName="active">{item.title}</Link>
                                                </li>
                                            )
                                        })
                                    }
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