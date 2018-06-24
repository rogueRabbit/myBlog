import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';

class Main extends Component {

    render() {

        return (

            <main className="col-md-8 main-content">
                <article id="111" className="post">
                    <div className="post-head">
                        <h1 className="post-title"><a href="/ghost-5-years/">5 年的时间、300 万美元的营收，这是我们创建 Ghost 的过程中学到的一切</a></h1>
                        <div className="post-meta">
                            <span className="author">作者：<a href="/author/wangsai/">王赛</a></span> •
                            <time className="post-date" dateTime="2018年5月17日星期四凌晨3点41分" title="2018年5月17日星期四凌晨3点41分">2018年5月17日</time>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>尚未译完，改天再译      原作者：JOHN O'NOLAN, HANNAH WOLFE 上周是 Ghost 从 Kickstarter 上推广算起的五周年纪念日。 利用这些里程碑来标记重要时刻并反思迄今为止的旅程总是显得很有趣。在上一个四周年纪念日里，我谈到了营收里程碑</p>
                    </div>
                    <div className="post-permalink">
                        {/*<a href="/ghost-5-years/" className="btn btn-default">阅读全文</a>*/}
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
                <article id="110" className="post">
                    <div className="post-head">
                        <h1 className="post-title"><a href="/theme-translations-and-blog-localisation/">主题模板和博客支持本地化了！</a></h1>
                        <div className="post-meta">
                            <span className="author">作者：<a href="/author/wangsai/">王赛</a></span> •
                            <time className="post-date" dateTime="2018年1月22日星期一下午5点03分" title="2018年1月22日星期一下午5点03分">2018年1月22日</time>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>上周我们 发布 了一个新版本，包含了大家期盼已久的功能：主题模板和网站对本地化的支持。  这个功能完全是由我们的一个贡献者（Juan）开发的，Ghost 基金提供了支持。 我们已经针对这个功能编写了完整的文档，下面就来介绍一下这个功能是如何工作的： 网站本地化 你可以在 Ghos</p>
                    </div>
                    <div className="post-permalink">
                        <a href="/theme-translations-and-blog-localisation/" className="btn btn-default">阅读全文</a>
                    </div>
                    <footer className="post-footer clearfix">
                        <div className="pull-left tag-list">
                            <i className="fa fa-folder-open-o"></i>
                        </div>
                        <div className="pull-right share">
                        </div>
                    </footer>
                </article>
            </main>
        )
    }
}

export default Main;