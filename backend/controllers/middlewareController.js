const jwt = require("jsonwebtoken")
const middlewareController = {
    // verify
    verifyToken: (req, res, next)=>{
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.SECRET_KEY,(err, user)=>{
                if(err){
                    res.status(403).json("token is not valid")
                }
                req.user= user
                next()
            })    
        }
        else{
            res.status(401).json("u r not")
        }
    },
    verifyTokenAndAdminAuth: (req, res, next)=>{
        middlewareController.verifyToken(req, res, ()=>{
            if(req.user.id == req.params.id || req.user.admin){
                next()
            }
            else{
                res.status(403).json("u r not allowed to delete other")
            }
        })
    }
}
module.exports = middlewareController