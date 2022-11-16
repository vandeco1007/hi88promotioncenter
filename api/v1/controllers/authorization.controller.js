const authorization = require('../models/authorize.model')
module.exports = {
    getAuth: async(req,res,next)=>{
        let autho = await authorization.findOne().exec()
        res.json(autho)
    },
    createAuth: async(req,res,next)=>{
        let {...body} = req.body
        let create = await authorization.create(body)
        res.json(create)
    },
    editAuth: async(req,res,next)=>{
        let authorize = req.body.authorization
        let edit = await authorization.findOneAndUpdate({_id:"637235910b6c419a8a480a01"},{authorization: authorize},{new: true})
        res.json(edit)
    }
}

//changed
//