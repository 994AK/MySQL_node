const  { loginCheck } = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleUserRouter = (req,res) =>{
    const method = req.method //GET POST
    const url = req.url
    const path = url.split("?")[0];

    //登录
    if(method === 'POST' && path === '/nodeJS/user/login') {
        const { username, password } = req.body
        const result = loginCheck(username, password)
        return result.then(data =>{
            console.log(data.username);
            //data:数据中的rows[0] => users表中的 [username, realname]
            if(data.username) {
                return new SuccessModel()
            }
            return new ErrorModel("登录失败")
        })
    }
}

module.exports = handleUserRouter;