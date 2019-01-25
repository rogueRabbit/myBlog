import React, { Component } from 'react';
import { Layout, Menu, Icon, message } from 'antd';
import { Link } from 'react-router';
import Util from 'utils';
import API from 'utils/api';
import { cookie } from 'cookie_js';

import './index.scss';

const { Header, Sider, Content } = Layout;

class HomeLayout extends Component {
  state = {
    collapsed: false,
    currentKey: '1',
    currentUser: '',
  };

  componentWillMount() {
    let isLogin = cookie.get('isLogin');
    if (isLogin !== '1') {
      let returnUrl = window.location.protocol + '//' + window.location.host;
      window.location.href = returnUrl;
    }
  }

  componentDidMount() {
    let pathName = this.props.location.pathname;
    let current = this.getkey(pathName);
    let userName = cookie.get('userName');
    this.setState({
      currentKey: current,
      currentUser: userName,
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === this.props.location.pathname) {
        return;
    } else {
      console.log(nextProps.location.pathname);
      let pathname = nextProps.location.pathname;
      let current = this.getkey(pathname);
      this.setState({
        currentKey: current,
      })
    }
  }

  getkey(pathname) {
    let current = '1';
    switch (pathname) {
      case '/userManager':
        current = '1';
        break;
       case '/labelManager':
        current = '2';
        break;
      case '/articleManager':
        current = '3';
        break;
      default:
        current = '1';
    }
    return current;
  }

  // 退出
  logout() {
    Util.get(API.userLouout, {}).then(json => {
      if (json.return_code === 0) {
        cookie.set('isLogin', 0);
        cookie.remove('userName');
        message.info('注销成功，页面自动跳回首页!');
        let returnUrl = window.location.protocol + '//' + window.location.host;
        window.location.href = returnUrl;
      } else {
        
      }
    });
  }

  render() {
    let { currentKey, currentUser } = this.state;
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div>
             <h3 style={{ padding: '20px', color: '#ffffff'}}>博客管理后台</h3>
          </div>
          <Menu theme="dark" mode="inline"  selectedKeys={[currentKey]}>
            <Menu.Item key="1">
              <Link to="/userManager" style={{color: '#fff'}}>
                <Icon type="user" />
                <span>用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/labelManager" style={{color: '#fff'}}>
                <Icon type="tag" />
                <span>标签管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/articleManager" style={{color: '#fff'}}>
                <Icon type="project" />
                <span>文章管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, position: 'relative'}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{padding: '0 24px'}}
            />
            <div className="userMessage">
              <span>欢迎您，</span>
              <span>{currentUser}</span>
              <span className="split">|</span>
              <a onClick={this.logout.bind(this)}>退出</a>
            </div>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default HomeLayout;