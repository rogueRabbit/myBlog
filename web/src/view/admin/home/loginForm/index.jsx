import React, { Component } from 'react';
import {
    Form, Icon, Input, Button,
  } from 'antd';
import { hashHistory } from 'react-router';
import Util from 'utils';
import API from 'utils/api';

class NormalLoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error_tips: {
          is_show: false,
          message: ''
        }
      }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
            Util.get(API.userLogin, {
              userName: values.userName,
              password: values.password
            }).then(json => {
                if (json.return_code === 0) {
                  this.setState({
                    error_tips: {
                      is_show: false,
                      message: ''
                    }
                  })
                  hashHistory.push('/userManager');
                } else {
                  let return_message = json.return_message;
                  this.setState({
                    error_tips: {
                      is_show: true,
                      message: return_message
                    }
                  })
                }
            });
        } else {
          
        }
      });
    }
  
    render() {
      
      let { error_tips } = this.state;
      const { getFieldDecorator } = this.props.form;
      
      return (
        <div>
            {
              error_tips.is_show ? (
                <p className="error_tips">{error_tips.message}</p>
              ): null
            }
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button login-btn">
                  登录
                </Button>
              </Form.Item>
            </Form>
        </div>
        
      );
    }
  }

  export default NormalLoginForm;