import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Modal, Form, Input, Divider, message } from 'antd';
import Nagination from 'component/navigation/index';
import Util from 'utils';
import API from 'utils/api';

const FormItem = Form.Item;

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
                        labelName: values.labelName,
                        sort: values.sort,
                    };
                    if (isEdit) {
                        params['id'] = this.props.current.id;
                    }
                    Util.post(API.addOrModifyLabel, params).then(json => {
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
                    title={`${onText}标签`}
                    okText={onText}
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={this.handleSubmit}
                    destroyOnClose="true"
                    afterClose={onClose}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem label="标签" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('labelName',
                                {
                                    rules: [{ required: true, message: '请输入标签！' }],
                                    initialValue: current.labelName,
                                })(
                                <Input />,
                            )}
                        </FormItem>
                        <FormItem label="排序" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('sort',
                                {
                                    rules: [{ required: true, message: '请输入排序！' }],
                                    initialValue: current.sort,
                                })(
                                <Input />,
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    },
);
  

class LabelManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdd:false, // 是否显示添加编辑弹框
            isEdit:0, // 是否是编辑
            data:[],
        };
    }

    componentDidMount() {
        this.queryLabelList();
    }


    // 查询标签列表
    queryLabelList() {
        Util.get(API.queryLabelList, {}).then(json => {
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
        this.queryLabelList();
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
                title: '删除标签',
                content: '是否确定删除' + currentItem.labelName,
                okText: '确认',
                cancelText: '取消',
                onOk: () => this.deleteItem(currentItem.id, currentItem.labelName),
            });
        }
    };

    // 删除用户
    deleteItem(id, name) {
        Util.get(API.deleteLabel, {
            id:id,
        }).then(res => {
            if (res) {
                if (res.return_code === 0) {
                    message.info(name + '已被删除');
                    this.queryLabelList();
                }
            }
        }, (error) => {
            console.log(error);
        });
    }   

    render() {

        const columns = [{
            title: '标签',
            dataIndex: 'labelName',
            key: 'labelName',
            }, {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            }, {
            title: '创建人',
            dataIndex: 'createMan',
            key: 'createMan',
          }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
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
                <Nagination title={'标签管理'}/>
                <Row>
                    <Col span={24}>
                        <div style={{padding: '10px', textAlign: 'right'}}>
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

export default LabelManager;