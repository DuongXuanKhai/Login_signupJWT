const User = require ('../models/user')
const jwt = require('jsonwebtoken')
const userController = {
    //getall
    getAllUser: async(req, res)=>{
        try {
            const user = await User.find()
            
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
            
        }
    },
    //Delete
    deleteUser: async(req, res)=>{
        try {
            const user = await  User.findById(req.params.id)
            res.status(200).json("Xoa thanh cong")
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = userController