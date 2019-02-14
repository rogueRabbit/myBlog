import React from 'react';

import './index.scss';

const AboutUs = () => {
    return (
        <div className="row">
            <div className="aboutUsWrap">
                <h3>关于我：</h3>
                <ul className="">
                    <li>
                        <span>姓名：</span>
                        <span>潘登</span>
                    </li>
                    <li>
                        <span>籍贯：</span>
                        <span>湖北黄冈</span>
                    </li>
                    <li>
                        <span>毕业于：</span>
                        <span>湖北师范大学</span>
                    </li>
                    <li>
                        <span>专业：</span>
                        <span>数字媒体技术</span>
                    </li>
                    <li>
                        <span>现就职于：</span>
                        <span>盛大游戏</span>
                    </li>
                    <li>
                        <span>工作方向：</span>
                        <span>web前端</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default AboutUs;