import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Modal, Form, Input, Divider } from 'antd';
import Nagination from 'component/navigation/index';

import './index.scss';

const FormItem = Form.Item;
const { TextArea } = Input;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        static propTypes = {
            visible:PropTypes.bool,
            onCancel:PropTypes.func,
            onCreate:PropTypes.func,
            form:PropTypes.object,
            current:PropTypes.object,
            onChange:PropTypes.func,
            isEdit:PropTypes.number,
            onClose:PropTypes.func,
            allMenuList:PropTypes.array,
            checkedKeys:PropTypes.array,
            onSelectMenus:PropTypes.func,
        }

        static defaultProps = {
            visible: false,
            onCancel:() => {},
            onCreate:() => {},
            form:{},
            current:{},
            onChange:() => {},
            isEdit:0,
            onClose:() => {},
            allMenuList:[],
            checkedKeys:[],
            onSelectMenus:() => {},
        }

        constructor(props) {
            super(props);
            this.state = {
                roleId: '0',
                autoExpandParent: true,
                selectedKeys: [],
            };
        }

        onCheck = (checkedKeys) => {
            console.log('checkedKeys', checkedKeys);
            this.props.onSelectMenus(checkedKeys);
            this.setState({
                selectedKeys:checkedKeys,
            });
        }

        onselectedKeys=() => {
            let _allMenuList = this.props.allMenuList;
            let _selectedKeys = this.props.checkedKeys || [];

            if (_selectedKeys.length) {
                _allMenuList.forEach((item) => {
                    let id = item.key + '';
                    let _children = item.children;
                    _selectedKeys.forEach((value) => {
                        if (value === id && _children.length) {
                            _selectedKeys.splice(_selectedKeys.findIndex(value1 => value1 === id), 1);
                        }
                    });
                });
            }
            console.log(_selectedKeys);
            return _selectedKeys;
        }

        // 提交表单
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let isEdit = this.props.isEdit;
                    let auth = this.onselectedKeys();
                    const params = {
                        id:this.props.current.id,
                        name:values.name,
                        intro:values.intro,
                        auth:auth,

                    };
                    
                }
            });
        }

        onChangeRole = (roleId) => {
            if (!('value' in this.props)) {
                this.setState({ roleId });
            }
            this.triggerChange({ roleId });
        }

        triggerChange = (changedValue) => {
            // Should provide an event to pass value to Form.
            const onChange = this.props.onChange;
            if (onChange) {
                onChange(Object.assign({}, this.state, changedValue));
            }
        }


        render() {
            const {
                visible, onCancel, form, current, isEdit, onClose
            } = this.props;

            const { getFieldDecorator } = form;
            let isDisabled = false;
            let onText = isEdit === 1 ? '编辑' : '创建';
            if (isEdit === 1) {
                isDisabled = true;
            } else {
                isDisabled = false;
            }
           

            return (
                <Modal
                    visible={visible}
                    title={`${onText}用户`}
                    okText={onText}
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={this.handleSubmit}
                    destroyOnClose="true"
                    afterClose={onClose}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem label="用户名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('name',
                                {
                                    rules: [{ required: true, message: '请输入用户名！' }],
                                    initialValue: current.name,
                                })(
                                <Input />,
                            )}
                        </FormItem>
                        <FormItem label="手机号码" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('phone',
                                {
                                    rules: [{ required: true, message: '请输入手机号码！' }],
                                    initialValue: current.phone,
                                })(
                                <Input />,
                            )}
                        </FormItem>
                        <FormItem label="登录密码" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('loginPassword',
                                {
                                    rules: [{ required: true, message: '请输入登录密码！' }],
                                    initialValue: current.loginPassword,
                                })(
                                <Input type="password" />,
                            )}
                        </FormItem>
                        <FormItem label="用户描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('intro', { initialValue: current.intro || '' })(<TextArea placeholder="请输入用户描述信息" autosize={{ minRows: 2, maxRows: 6 }} />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    },
);
  

class UserManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdd:false, // 是否显示添加编辑弹框
            isEdit:0, // 是否是编辑
            data:[],
        };
    }

    showModal = () => {
        this.setState({
            showAdd: true,
            current: {},
        });
    }

    handleCancel = () => {
        this.setState({ showAdd: false });
    }

    showEditModal = (item) => {
        
        this.setState({
            showAdd: true,
            current: item,
            isEdit: 1,
        });
    }

    editAndDelete = (currentItem, key) => {
        if (key === 'edit') this.showEditModal(currentItem, key);
        else if (key === 'delete') {
            Modal.confirm({
                title: '删除用户',
                content: '是否确定删除' + currentItem.name,
                okText: '确认',
                cancelText: '取消',
                onOk: () => this.deleteItem(currentItem.id, currentItem.name),
            });
        }
    };

    // 删除用户
    deleteItem(id, name) {



    }   

    render() {

        const columns = [{
            title: '用户名',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '手机号码',
            dataIndex: 'phone',
          }, {
            title: '登录密码',
            dataIndex: 'loginPassword',
            render: text => 'xxx'
          },{
            title: '用户描述',
            dataIndex: 'intro',
          },{
            title: '操作', 
            dataIndex: '', 
            key: 'x', 
            render: (text, record) => (
                <span>
                    <a onClick={() => this.editAndDelete(record, 'edit')}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.editAndDelete(record, 'delete')}>删除</a>
                </span>
            ),
          },];
          const data = [{
            key: '1',
            name: 'John Brown',
            phone: 32,
            loginPassword: 111,
            intro: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            name: 'Jim Green',
            phone: 42,
            loginPassword: 111,
            intro: 'London No. 1 Lake Park',
          }, {
            key: '3',
            name: 'Joe Black',
            phone: 32,
            loginPassword: 111,
            intro: 'Sidney No. 1 Lake Park',
          }, {
            key: '4',
            name: 'Disabled User',
            phone: 99,
            loginPassword: 111,
            intro: 'Sidney No. 1 Lake Park',
          }];
          
          // rowSelection object indicates the need for row selection
          const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };

        let { showAdd, isEdit, current = {} } = this.state;
        return (
            <div>
                <Nagination title={'用户管理'}/>
                <Row>
                    <Col span={24}>
                        <div className="handleWrap">
                            <Button type="primary" onClick={this.showModal}>新增</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                    </Col>
                </Row>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={showAdd}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    current={current}
                    isEdit={isEdit}
                    onClose={this.onClose}
                />
            </div>
        )
    }
}

export default UserManager;