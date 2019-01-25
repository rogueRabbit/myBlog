import React, { Component } from 'react';
import Aside from 'view/front/aside/index';

class Article extends Component {

    render(){
        return (
            <div className="row">
                <main className="col-md-8 main-content">
                    <article id="111" className="post">
                        <header className="post-head">
                            <h1 className="post-title">5 年的时间、300 万美元的营收，这是我们创建 Ghost 的过程中学到的一切</h1>
                            <section className="post-meta">
                                <span className="author">作者：<a href="/author/wangsai/">王赛</a></span> •
                                <time className="post-date" dateTime="2018年5月17日星期四凌晨3点41分" title="2018年5月17日星期四凌晨3点41分">2018年5月17日</time>
                            </section>
                        </header>
                        <section className="post-content">
                            <blockquote>
                                <p>尚未译完，改天再译</p>
                                <p>原作者：JOHN O'NOLAN, HANNAH WOLFE</p>
                            </blockquote>
                            <p>上周是 Ghost 从 Kickstarter 上推广算起的五周年纪念日。</p>
                            <p>利用这些里程碑来标记重要时刻并反思迄今为止的旅程总是显得很有趣。在上一个四周年纪念日里，我谈到了营收里程碑和产品更新的话题，但是今年我将更多地将重心放在迄今为止整个过程中我们所学到的东西上。</p>
                            <p>不过，为了便于理解，这里简要概述了我们目前的情况：</p>
                            <ul>
                                <li><strong>MRR（月度营收）:</strong> $82,000</li>
                                <li><strong>年度净营收：</strong> $1.2million</li>
                                <li><strong>有史以来总营收：</strong> $3million</li>
                                <li><strong>Github 星标数:</strong> 25,000</li>
                                <li><strong>已发布版本数：</strong> 173</li>
                                <li><strong>Ghost 网站数：</strong> 512,000</li>
                                <li><strong>知名用户：</strong> Apple、Tinder、DuckDuckGo、Mozilla、OpenAI、OkCupid、Square、Vevo、DigitalOcean、Napster、CloudFlare，还有 <a href="https://ghost.org/customers/">很多，很多</a>.</li>
                                <li><strong>Runway:</strong> 开个玩笑，我们从第一年就开始盈利了</li>
                            </ul>
                        </section>
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