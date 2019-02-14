import React, { PureComponent } from 'react';
import Aside from 'view/front/aside/index';
import { Link } from 'react-router';
import Util from 'utils';
import API from 'utils/api';

import './index.scss';


class Note extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            noteList: []
        }
    }

    componentDidMount() {
        this.queryArticleList();
    }

    queryArticleList() {
        Util.get(API.queryArticleList, {status: 1}).then(json => {
            if (json.return_code === 0) {
                let list = json.data.list;
                this.setState({
                    noteList: list
                })
            } else {
            
            }
        });
    }

    render() {
        let { noteList } = this.state;
        return (
            <div className="row">
                <main className="col-md-8 main-content">
                    <div className="alert alert-info" role="alert" style={{backgroundColor: '#fff', color: '#000', fontSize: '20px', fontWeight: 'bold'}}>文章归档</div>
                    <div className="noteWrap">
                        <div className="archives">
                            <div className="archivesItem">
                                <ul className="archivesList">
                                    {
                                        noteList.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <span className="date">{item.publishTime.substring(0,10)}日</span> 
                                                    <Link to={'/article?id=' + item.id} >{item.title}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
                <Aside />
            </div>
        )
    }
}

export default Note;