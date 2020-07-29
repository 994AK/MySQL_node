const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method //GET POST
    const url = req.url
    const path = url.split("?")[0];
    const id = req.query.id;

    //获取博客列表
    if (method === 'GET' && path === '/nodeJS/blog/list') {
        const author = req.query.author || '' // app.js query已经解析过了
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword) //返回数据
        // return new SuccessModel(listData)

        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        });
    }

    //获取博客内容
    if (method === 'GET' && path === '/nodeJS/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })

    }

    //新增一篇博客
    if (method === 'POST' && path === '/nodeJS/blog/new') {
        req.body.author = 'zhangsan' //假数据,待开发登录的时候进行修改
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //更新一篇博客
    if (method === 'POST' && path === '/nodeJS/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    //删除一篇博客
    if (method === 'POST' && path === '/nodeJS/blog/del') {
        const author = 'zhangsan' //假数据,待开发登录的时候进行修改
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel("博客删除失败")
            }
        })
    }
}

module.exports = handleBlogRouter;