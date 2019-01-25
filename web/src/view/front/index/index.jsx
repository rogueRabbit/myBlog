import React, { Component } from 'react';
import Util from 'utils';
import API from 'utils/api';
import ArticleItem from 'component/articleItem/index';
import Aside from 'view/front/aside/index';

import './index.scss';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
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
                    articleList: list,
                })
            } else {
            
            }
        });
    }

    render(){
        let { articleList } = this.state;
        return (
            <div className="row">
                <main className="col-md-8 main-content">
                    {
                        articleList.length > 0 ? (
                            articleList.map((item, index) => {
                                return (
                                    <ArticleItem singleArticle={item} key={index} />
                                )
                            })
                        ) : null
                    }
                </main>
                <Aside />
            </div>
        )
    }
}

export default Index;