import React, { PureComponent } from 'react';
import Aside from 'view/front/aside/index';
import Util from 'utils';
import API from 'utils/api';
import ArticleItem from 'component/articleItem/index';
import Empty from 'component/empty/index';


class Subject extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            labelId: '',
            labelName: '',
            articleList: [],
        }
    }

    componentDidMount() {
        let search = this.props.location.search;
        let id = Util.getUrlParam(search, 'labelId');
        let labelName = Util.getUrlParam(search, 'labelName');
        this.setState({
            labelId: id,
            labelName: labelName
        })
        this.queryArticleByLabel(id);
    }

    componentWillReceiveProps(nextProps) {
        let { labelId, labelName } = this.state;
        let search  = nextProps.location.search;
        let id = Util.getUrlParam(search, 'labelId');
        let name = Util.getUrlParam(search, 'labelName');

        if (labelId !== id && labelName !== name) {
            this.setState({
                labelId: id,
                labelName: name
            });
            this.queryArticleByLabel(id);
        }
    }

    // 查询某个标签下的文章
    queryArticleByLabel(relationLabel) {
        Util.get(API.queryArticleByLabel, {relationLabel: relationLabel}).then(json => {
            if (json.return_code === 0) {
                let articleList = json.data.articleList;
                this.setState({
                    articleList: articleList
                })
            } else {
            
            }
        });
    }

    render() {
        let { labelName, articleList } = this.state;
        return (
            <div className="row">
                <main className="col-md-8 main-content">
                    <div className="alert alert-info" role="alert" style={{backgroundColor: '#fff', color: '#000'}}>{labelName}</div>
                    {
                        articleList.length > 0 ? (
                            articleList.map((item, index) => {
                                return (
                                    <ArticleItem singleArticle={item} key={index} />
                                )
                            })
                        ) : <Empty/>
                    }
                </main>
                <Aside />
            </div>
        )
    }
}

export default Subject;