import React, { Component } from 'react';
import './index.scss';

class Footer extends Component {

    render(){

        return(

            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <span>Copyright © <a href="http://www.ghostchina.com/">Ghost中文网</a></span> |
                            <span><a href="http://www.miibeian.gov.cn/" >京ICP备11008151号</a></span> |
                            <span>京公网安备11010802014853</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Footer;