const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../middleware/auth')

router.post('/user',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
    // user.save().then(()=>res.send(user)).catch((e)=>res.status(400).send(e))
    
})

router.post('/user/login',async (req,res)=>{
    try{
        
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        
        res.status(200).send({user,token})
    }
    catch(e){
        console.log(e)
        res.status(400).send("login failed for user")
    }

})

router.get('/user/me',auth,async (req,res)=>{
    res.send(req.user)
    // User.find({}).then(users=>{
    //     res.status(200).send(users)
    // }).catch((e)=>res.status(500).send())
})

router.get('/user/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send()
    }
    // User.findById(_id).then((users)=>{
    //     if(!users){
    //         return res.status(404).send()
    //     }
    //     res.send(users)
    // }).catch(
    //     (e)=>res.status(500).send()
    // )
})

router.patch('/user/:id',async (req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const validUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>validUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error :'Invalid updates!'})
    }
    
    //const user = await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
    try{
        const user = await User.findById(_id)
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})
router.delete("/user/:id",async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send("user not found")
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router