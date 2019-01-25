import React, { PureComponent } from 'react';
import Util from 'utils';
import API from 'utils/api';
import './index.scss';

class Aside extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            labelList: [],
        }
    }

    componentDidMount() {
        this.queryLabelList();
    }

    // 查询标签列表
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


    render(){
        let { labelList } = this.state;
        return (
            <aside className="col-md-4 sidebar">
                <div className="widget">
                    <h4 className="title">联系方式</h4>
                    <div className="content community">
                        <p>QQ：2016013897</p>
                        <p>Telephone：15172054835</p>
                    </div>
                </div>
                <div className="widget">
                    <h4 className="title">标签云</h4>
                    <div className="content tag-cloud">
                        {
                            labelList.map((item, index) => {
                                return (
                                    <a href="/tag/ke-hu-duan/" key={index}>{item.labelName}</a>
                                )
                            })
                        }
                    </div>
                </div>
            </aside>
        )
    }
}

export default Aside;