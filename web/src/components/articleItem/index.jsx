import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class ArticleItem extends PureComponent {

    static propTypes = {
        singleArticle: PropTypes.object,
    }

    static defaultProps = {
        singleArticle: {},
    } 

    showContent(content) {
        // let newContent = content.replace(/%25/g, '%');
        // return decodeURIComponent(newContent);
        return content;
    }

    render() {
        let { singleArticle } = this.props;
        return (
            <article id={singleArticle.id} className="post">
                    <div className="post-head">
                        <h1 className="post-title"><a href="/ghost-5-years/">{singleArticle.title}</a></h1>
                        <div className="post-meta">
                            <span className="author">作者：<a href="/author/wangsai/">{singleArticle.publishMan}</a></span> •
                            <time className="post-date" >{singleArticle.publishTime}</time>
                        </div>
                    </div>
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: this.showContent(singleArticle.content)}} />
                    <div className="post-permalink">
                        <Link to="/article" className="btn btn-default">阅读全文</Link>
                    </div>
                    <footer className="post-footer clearfix">
                        <div className="pull-left tag-list">
                            <i className="fa fa-folder-open-o"></i>
                        </div>
                        <div className="pull-right share">
                        </div>
                    </footer>
                </article>
        )
    }
}

export default ArticleItem;