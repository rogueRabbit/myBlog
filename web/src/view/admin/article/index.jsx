import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Modal, Form, Input, Divider } from 'antd';
import Nagination from 'component/navigation/index';
import Ueditor from 'component/ueditor/index';

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
            let content = this.refs.childEditor.getContent();
            console.log(content);
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let isEdit = this.props.isEdit;
                    const params = {
                        id: this.props.current.id,
                        title: values.title,
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
                    title={`${onText}文章`}
                    okText={onText}
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={this.handleSubmit}
                    destroyOnClose="true"
                    afterClose={onClose}
                    width='1000px'
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem label="文章标题" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('title',
                                {
                                    rules: [{ required: true, message: '请输入文章标题！' }],
                                    initialValue: current.title,
                                })(
                                <Input />,
                            )}
                        </FormItem>
                        <FormItem label="文章内容" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                            <Ueditor ref="childEditor" id="content" /> 
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    },
);
  

class ArticleManager extends Component {
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
                title: '删除文章',
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
            title: '文章标题',
            dataIndex: 'title',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '作者',
            dataIndex: 'author',
          }, {
            title: '排序',
            dataIndex: 'sort',
          }, {
            title: '创建时间',
            dataIndex: 'createTime',
          },{
            title: '状态',
            dataIndex: 'status',
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
            title: 'John Brown',
            author: 32,
            sort: 111,
            createTime: 'New York No. 1 Lake Park',
            status: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            title: 'Jim Green',
            author: 42,
            sort: 111,
            createTime: 'London No. 1 Lake Park',
            status: 'London No. 1 Lake Park',
          }, {
            key: '3',
            title: 'Joe Black',
            author: 32,
            sort: 111,
            createTime: 'Sidney No. 1 Lake Park',
            status: 'Sidney No. 1 Lake Park',
          }, {
            key: '4',
            title: 'Disabled User',
            author: 99,
            sort: 111,
            createTime: 'Sidney No. 1 Lake Park',
            status: 'Sidney No. 1 Lake Park',
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
                <Nagination title={'文章管理'}/>
                <Row>
                    <Col span={24} style={{padding: '10px', textAlign: 'right'}}>
                        <div >
                            <Button type="primary" onClick={this.showModal}>新增</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                    </Col>
                </Row>
                {
                    showAdd || isEdit ? (
                        <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={showAdd}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    current={current}
                    isEdit={isEdit}
                    onClose={this.onClose}
                />
                    ) : null
                }
                
            </div>
        )
    }
}

export default ArticleManager;