import React, { Component } from 'react';
import './index.scss';

class Aside extends Component {

    render(){

        return (

            <aside className="col-md-4 sidebar">
                <div className="widget">
                    <h4 className="title">社区</h4>
                    <div className="content community">
                        <p>QQ群：277327792</p>
                        <p><a href="http://wenda.ghostchina.com/" title="Ghost中文网问答社区" ><i className="fa fa-comments"></i> 问答社区</a></p>
                        <p><a href="http://weibo.com/ghostchinacom" title="Ghost中文网官方微博"  ><i className="fa fa-weibo"></i> 官方微博</a></p>
                    </div>
                </div>
                <div className="widget">
                    <h4 className="title">下载 Ghost</h4>
                    <div className="content download">
                        <a href="/download/" className="btn btn-default btn-block" >Ghost 中文版（0.7.4）</a>
                    </div>
                </div>
                <div className="widget">
                    <h4 className="title">标签云</h4>
                    <div className="content tag-cloud">
                        <a href="/tag/ke-hu-duan/">客户端</a>
                        <a href="/tag/android/">Android</a>
                        <a href="/tag/jquery/">jQuery</a>
                        <a href="/tag/ghost-0-7-ban-ben/">Ghost 0.7 版本</a>
                        <a href="/tag/opensource/">开源</a>
                        <a href="/tag/zhu-shou-han-shu/">助手函数</a>
                        <a href="/tag/tag-cloud/">标签云</a>
                        <a href="/tag/navigation/">导航</a>
                        <a href="/tag/customize-page/">自定义页面</a>
                        <a href="/tag/static-page/">静态页面</a>
                        <a href="/tag/roon-io/">Roon.io</a>
                        <a href="/tag/configuration/">配置文件</a>
                        <a href="/tag/upyun/">又拍云存储</a>
                        <a href="/tag/upload/">上传</a>
                        <a href="/tag/handlebars/">Handlebars</a>
                        <a href="/tag/email/">邮件</a>
                        <a href="/tag/shortcut/">快捷键</a>
                        <a href="/tag/yong-hu-zhi-nan/">用户指南</a>
                        <a href="/tag-cloud/">...</a>
                    </div>
                </div>
            </aside>
        )
    }
}

export default Aside;