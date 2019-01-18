import React, { Component } from 'react';
import Main from  '../main/index';
import Aside from '../aside/index';

class Index extends Component {

    render(){

        return (

            <section className="content-wrap">
                <div className="container">
                    <div className="row">
                        <Main></Main>
                        <Aside></Aside>
                    </div>
                </div>
            </section>
        )
    }
}

export default Index;