const express = require('express')
const router = new express.Router()
const Task = require('../models/tasks')
const { default: mongoose } = require('mongoose')



router.get('/task/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const task = Task.findById(_id)
        if(!task){
            res.status(404).send()
        }
        res.status(201).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    // res.status(200).send(task)    }).catch((e) => res.status(504).send)
})

router.patch('/task/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const validUpdates = ["description","Completed"]
    const isValidUpdate = updates.every((update)=>validUpdates.includes(update))
    if (!isValidUpdate){
        return res.status(400).send({error :'Invalid updates!'})
    }
    
    try{
        const task = await Task.findById(req.params.id)
        updates.forEach(element =>task[element]=req.body[element] )
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body, {new : true, runValidators:true})
    if(!task){
        return res.status(404).send('user not found to update')
    }
    res.send(task)
}
catch(e){
    res.status(500).send(e)
}

})
router.delete("/task/:id",async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send("user not found")
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})
router.get('/task', async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks)=>res.send(tasks)).catch(e=>res.status(500).send())
})
router.post("/task",async (req,res)=>{
    console.log(req.body)
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(200).send(task)
    }
    catch(e){
    res.status(400).send(e)
    }
})

module.exports = router