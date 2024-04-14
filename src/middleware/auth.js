const User = require('../models/users')
const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
    try{
    const token = req.header('Authorization').replace('Bearer','')
    const decode = jwt.verify(token,'thisisnewcourse')
    const user = User.findOne({_id : decode._id,'tokens.token' : token})
    if(!user){
        throw new Error()
    }
    req.user = user
    next()
    }
    catch(e){
        res.status(401).send("Authentication failed")
    }

}
  

module.exports = auth