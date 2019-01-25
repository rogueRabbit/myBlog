const articleModel = require('../modules/article');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.json');
const bcrypt = require('bcryptjs');
const util = require('util');
const verify = util.promisify(jwt.verify);
const statusCode = require('../util/status-code');

class ArticleController {

    // 新增或修改文章
    static async addOrModifyArticle(ctx) {
        const article = ctx.request.body;
        ctx.response.status = 200;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        if ( !article.title || !article.content || !article.relationLabel || !article.sort || !article.publishMan || !article.status) {
            ctx.body = statusCode.ERROR_1004();
        } else {
            if (article.id) { // 修改文章
                const existArticle = await articleModel.findById(article.id);
                if (existArticle) {
                    await articleModel.updateArticle(article);
                    ctx.body = statusCode.SUCCESS_200('修改文章成功', {});
                } else {
                    ctx.body = statusCode.ERROR_1011();
                }
            } else { // 新增文章
                await articleModel.createArticle(article);
                ctx.body = statusCode.SUCCESS_200('新增文章成功', {});
            }
        }
    }

    // 查询所有的文章
    static async queryAllArticle(ctx) {
        ctx.response.status = 200;
        const queryParams = ctx.query;
        const articleList = await articleModel.queryAllArticle(queryParams);
        ctx.body = statusCode.SUCCESS_200('success', {
            list: articleList
        })
    }

    // 上架/下架文章
    static async shelfArticle(ctx) {
        const article = ctx.query;
        ctx.response.status = 200;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        if (article.id && article.status) {
            let result = await articleModel.shelfArticle(article);
            if (result) {
                ctx.body = statusCode.SUCCESS_200('下架文章成功', {});
            } else {
                ctx.body = statusCode.ERROR_1012();
            }
        } else {
            ctx.body = statusCode.ERROR_1004();
        }
    }
}

module.exports =  ArticleController;