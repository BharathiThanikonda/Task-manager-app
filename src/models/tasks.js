const mongoose =require ('mongoose')
const taskSchema = new mongoose.Schema({
    description : {
        type : String
    },
    Completed : {
        type : Boolean,
        trim : true
    }
})
const Task = mongoose.model('Tasks',taskSchema)

module.exports = Task