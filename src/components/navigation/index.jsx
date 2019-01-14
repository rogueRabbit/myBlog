import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

import './index.scss';

class Nagination extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
    }

    static defaultProps = {
        title: '',
    } 

    render() {
        return (
            <div className="naginationWrwp">
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

export default Nagination;