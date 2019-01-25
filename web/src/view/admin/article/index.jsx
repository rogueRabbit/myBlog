import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Modal, Form, Input, Divider, Select, message } from 'antd';
import Nagination from 'component/navigation/index';
import Ueditor from 'component/ueditor/index';
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
                labelList: [],
            };
        }

        componentDidMount() {
            this.queryLabelList();
        }

        // 查询所有的标签
        queryLabelList() {
            Util.get(API.queryLabelList, {}).then(json => {
                if (json.return_code === 0) {
                    let list = json.data.list;
                    this.setState({
                        labelList: list,
                    })
                } else {
                
                }
            });
        }

        // 提交表单
        handleSubmit = (e) => {
            e.preventDefault();
            let content = this.refs.childEditor.getContent();
            console.log(content);
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let isEdit = this.props.isEdit;
                    let foramtConent = encodeURIComponent(content);
                    // foramtConent = foramtConent.replace(/%/g, '%25');
                    const params = {
                        title: values.title,
                        relationLabel: values.relationLabel,
                        content: content,
                        sort: values.sort,
                        status: 1,
                        publishMan: 'pandeng'
                    };

                    if (isEdit) {
                        params['id'] = this.props.current.id;
                    }
                    
                    Util.post(API.addOrModifyArticle, params).then(json => {
                        if (json.return_code === 0) {
                            this.props.onCreate();
                        } else {
                            message.info(json.return_message);
                        }
                    });

                }
            });
        }


        render() {
            const {
                visible, onCancel, form, current, isEdit, onClose
            } = this.props;

            let { labelList } = this.state;

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
                        <FormItem label="所属标签" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('relationLabel',
                                {
                                    rules: [{ required: true, message: '请选择所属标签！' }],
                                    initialValue: current.relationLabel,
                                })(
                                <Select>
                                    { labelList.length > 0 ? (
                                        labelList.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.labelName}</option>
                                        })
                                    ) : null }
                                </Select>,
                            )}
                        </FormItem>
                        <FormItem label="排序" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('sort',
                                {
                                    rules: [{ required: true, message: '请输入排序！' }],
                                    initialValue: current.sort,
                                })(
                                <Input />,
                            )}
                        </FormItem>
                        <FormItem label="文章内容" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                            <Ueditor ref="childEditor" id="content" editorContent={current.content} /> 
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

    componentDidMount() {
        this.queryArticleList();
    }

    // 查询文章
    queryArticleList() {
        Util.get(API.queryArticleList, {}).then(json => {
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
        this.queryArticleList();
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
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
            let title = currentItem.status === 1 ? '下架' : '上架';
            Modal.confirm({
                title: title + '文章',
                content: '是否确定' + title +'【' + currentItem.title + '】',
                okText: '确认',
                cancelText: '取消',
                onOk: () => this.deleteItem(currentItem.id, currentItem.title, currentItem.status, title),
            });
        }
    };

    // 删除标签
    deleteItem(id, title, status, handleTitle) {
        let lastStatus = status === 1 ? -1 : 1;
        Util.get(API.shelfArticle, {
            id: id,
            status: lastStatus,
        }).then(res => {
            if (res) {
                if (res.return_code === 0) {
                    message.info(title + '已被' + handleTitle);
                    this.queryArticleList();
                }
            }
        }, (error) => {
            console.log(error);
        });
    }   

    render() {

        const columns = [{
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
          }, {
            title: '所属标签',
            dataIndex: 'relationLabel',
            key: 'relationLabel',
          }, {
            title: '作者',
            dataIndex: 'publishMan',
            key: 'publishMan',
          }, {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
          }, {
            title: '创建时间',
            dataIndex: 'publishTime',
            key: 'publishTime',
          },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return record.status === 1 ? '上架' : '下架';
            }
          },{
            title: '操作', 
            dataIndex: '', 
            key: 'handle', 
            render: (text, record) => (
                <span>
                    <a onClick={() => this.editAndDelete(record, 'edit')}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.editAndDelete(record, 'delete')}>{record.status === 1 ? '下架' : '上架'}</a>
                </span>
            ),
          },];
          
        let { data, showAdd, isEdit, current = {} } = this.state;
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
                        <Table  columns={columns} dataSource={data} />
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