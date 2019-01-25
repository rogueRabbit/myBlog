import React, { PureComponent } from 'react';
import Aside from 'view/front/aside/index';

class Note extends PureComponent {

    render() {
        return (
            <div className="row">
                <main className="col-md-8 main-content">
                    <div className="post">
                        笔记
                    </div>
                </main>
                <Aside />
            </div>
        )
    }
}

export default Note;