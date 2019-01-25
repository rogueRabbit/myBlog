import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Modal, Form, Input, Divider, message } from 'antd';
import Nagination from 'component/navigation/index';
import Util from 'utils';
import API from 'utils/api';

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


        // 提交表单
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let isEdit = this.props.isEdit;
                    const params = {
                        id: this.props.current.id,
                        userName: values.userName,
                        password: values.loginPassword,
                        remarks: values.remarks,
                    };
                    Util.post(API.addUser, params).then(json => {
                        if (json.return_code === 0) {
                            this.props.onCreate();
                        } else {
                            message.info(json.return_message);
                        }
                    }, (error) => {
                        console.log(error);
                    });
                }
            });
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
                            {getFieldDecorator('userName',
                                {
                                    rules: [{ required: true, message: '请输入用户名！' }],
                                    initialValue: current.userName,
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
                            {getFieldDecorator('remarks', { initialValue: current.remarks || '' })(<TextArea placeholder="请输入用户描述信息" autosize={{ minRows: 2, maxRows: 6 }} />)}
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

    componentDidMount() {
        this.queryUserList();
    }

    // 查询用户列表
    queryUserList() {
        Util.get(API.queryUserList, {}).then(json => {
            if (json.return_code === 0) {
                let list = json.data.list;
                let newList = list.map((item, index) => {
                    return Object.assign({}, item, {key: index});
                })
                this.setState({
                    data: newList
                })
            } else {
            
            }
        });
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

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.resetFields();
        this.setState({ showAdd: false });
        this.queryUserList();
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
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
                content: '是否确定删除' + currentItem.userName,
                okText: '确认',
                cancelText: '取消',
                onOk: () => this.deleteItem(currentItem.id, currentItem.userName),
            });
        }
    };

    // 删除用户
    deleteItem(id, name) {
        Util.get(API.deleteUser, {
            id:id,
        }).then(res => {
            if (res) {
                if (res.return_code === 0) {
                    message.info(name + '已被删除');
                    this.queryUserList();
                }
            }
        }, (error) => {
            console.log(error);
        });
    }   

    render() {

        const columns = [{
            key: 'userName',
            title: '用户名',
            dataIndex: 'userName',
          }, {
            key: 'createTime',
            title: '创建时间',
            dataIndex: 'createTime',
          },{
            key: 'remarks',
            title: '用户描述',
            dataIndex: 'remarks',
          },{
            title: '操作', 
            dataIndex: '', 
            key: 'handle', 
            render: (text, record) => (
                <span>
                    <a onClick={() => this.editAndDelete(record, 'edit')}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.editAndDelete(record, 'delete')}>删除</a>
                </span>
            ),
          },];
          
        let { data, showAdd, isEdit, current = {} } = this.state;
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
                        <Table  columns={columns} dataSource={data} />
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