const Router = require('koa-router')
const UserController = require('../controllers/user')
const LabelController = require('../controllers/label')
const ArticleController = require('../controllers/article')
const NoteController = require('../controllers/note')

const router = new Router({
    prefix: '/api'
})

/**
 * 用户接口
 */

 // 用户登录
router.get('/user/login', UserController.login);

 // 查询所有的用户
router.get('/user/queryUserList', UserController.queryUserList);

// 创建用户
router.post('/user/createUser', UserController.create);

// 删除用户
router.get('/user/deleteUser', UserController.deleteUser);

// 注销用户
router.get('/user/userLouout', UserController.userLouout);


/**
 * 标签接口
 */

 // 创建标签
 router.post('/label/addOrModifyLabel', LabelController.addOrModifyLabel);

 // 查询标签
 router.get('/label/queryLabelList', LabelController.queryLabelList);

 // 删除标签
 router.get('/label/deleteLabel', LabelController.deleteLabel);


 /**
  * 文章接口
  */

// 创建文章
router.post('/article/addOrModifyArticle', ArticleController.addOrModifyArticle);

// 查询文章
router.get('/article/queryArticleList', ArticleController.queryAllArticle);

// 下架文章
router.get('/article/shelfArticle', ArticleController.shelfArticle);

// 查询文章详情
router.get('/article/queryArticleById', ArticleController.queryArticleById);

// 查询某个标签的文章
router.get('/article/queryArticleByLabel', ArticleController.queryArticleByLabel);


/**
  * 笔记接口
  */

// 创建笔记
router.post('/note/addOrModifyNote', NoteController.addOrModifyNote);

// 查询笔记
router.get('/note/queryAllNote', NoteController.queryAllNote);

// 下架笔记
router.get('/note/shelfNote', NoteController.shelfNote);

// 查询笔记详情
router.get('/note/queryNoteById', NoteController.queryNoteById);




module.exports = router
