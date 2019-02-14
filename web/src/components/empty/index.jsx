import React from 'react';
import noData from 'assets/images/noData.png';

import './index.scss';

const Empty = () => {
    return (
        <div className="noDataWrap">
            <img src={noData} alt="no data" />
            <p className="noDataText">没有数据</p>
        </div>
    )
}

export default Empty;