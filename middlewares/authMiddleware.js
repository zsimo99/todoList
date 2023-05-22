const jwt=require("jsonwebtoken")
const User=require("../models/user")

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,"secret",(err,decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect("/login")
            }else{
                next()
            }
        })
    }else{
        res.redirect("/login")
    }
}

const checkUser=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,"secret",async (err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.locals.user=null
                next()
            }else{
                res.locals.user=decodedToken
                req.user=decodedToken
                next()
            }
        })
    }else{
        res.locals.user=null
        next()
    }
}

module.exports={requireAuth,checkUser}