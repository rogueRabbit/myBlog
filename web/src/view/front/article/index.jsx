import React, { Component } from 'react';
import Aside from 'view/front/aside/index';
import Util from 'utils';
import API from 'utils/api';

class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            articleDetail: {},
        }
    }

    componentDidMount() {
        console.log(this.props);
        let search = this.props.location.search;
        let id = Util.getUrlParam(search, 'id');
        this.queryArticleDetail(id);
    }

    // 查询文章的详情
    queryArticleDetail(id) {
        Util.get(API.queryArticleById, {id: id}).then(json => {
            if (json.return_code === 0) {
                let articleDetail = json.data.articleDetail;
                this.setState({
                    articleDetail: articleDetail
                })
            } else {
            
            }
        });
    }

    render() {
        let { articleDetail } = this.state;
        return (
            <div className="row">
                <main className="col-md-8 main-content">
                    <article id="111" className="post">
                        <header className="post-head">
                            <h1 className="post-title">{articleDetail.title}</h1>
                            <section className="post-meta">
                                <span className="author">作者：{articleDetail.publishMan}</span> •
                                <time className="post-date" >{articleDetail.publishTime}</time>
                            </section>
                        </header>
                        <section className="post-content" dangerouslySetInnerHTML={{ __html: articleDetail.content}} />
                        <footer className="post-footer clearfix">
                            <div className="pull-left tag-list">
                                <i className="fa fa-folder-open-o"></i>
                            </div>
                            <div className="pull-right share">
                                <div className="bdsharebuttonbox share-icons bdshare-button-style0-24" data-bd-bind="1529824975653"></div>
                            </div>
                        </footer>
                    </article>
                </main>
                <Aside />
            </div>
            
        )
    }

}

export default Article;