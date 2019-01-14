import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';

const { Header, Sider, Content } = Layout;

class HomeLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{padding: '0 24px'}}
            />
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