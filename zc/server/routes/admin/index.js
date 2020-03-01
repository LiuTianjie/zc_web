module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    //引入mongdbo模型
    const Model = require('../../models/Order')
    //创建接口
    router.post('/orders', async (req, res) => {
        // console.log(req.body)
        const exist = await Model.find({ user: req.body.user, date: req.body.date, train: req.body.train });
        console.log(exist)
        if (exist.length == 0) {
            const model = await Model.create(req.body)
            res.send(model)
        }
        else {
            res.status(401).send("您已经购买过当日当次车票，请勿重复购买")
        }
    })

    //获取列表接口
    router.get('/orders/:id', async (req, res) => {
        const item = await Model.findOne({ user: req.params.id })

        if (item === null) {
            res.status(401).send("未查到数据！")
        }
        else {
            const id = item._id
            console.log(id)
            await Model.findOneAndDelete({ _id: id })
            console.log("使用成功！已删除！")
            res.send(item)
        }


    })
    //删除列表接口
    router.delete('/:id', async (req, res) => {
        await Model.findOneAndDelete(req.params.id)
        res.send({
            success: true
        })
    })


    app.use('/admin/api', router)
    //错误处理函数，全局
    app.use(async (err, req, res, next) => {

        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}  