const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
})
// const user = mongoose.model('users',{
//     name : {
//         type : String,
//         trim : true,
//         lowercase : true
//     },
//     age : {
//         type : Number
//     },
//     password : {
//         type : String,
//         required : true,
//         trim : true,
//         minlength : 7,
//         validate(value){
//             if (value.includes('password')){
//                 throw new Error (" password should not contain password keyword")
//             }
//         }
//     },
//     email : {
//         type : String,
//         required : true,
//         lowercase : true,
//         validate(value){
//           if(!validator.isEmail(value)){
//                  throw new Error ("enter valid email address")
//           }
//         }
//     }
// })

// const me = new user({
//     name : 'Bharathi       ',
//     age : 20,
//     email : "BHARAa@gmail.com",
//     password : "yyjyudj"
// })
// me.save().then((value)=>console.log(me)).catch((value)=>console.log(value))

// const Task = mongoose.model('Tasks', {
//     description : {
//         type : String
//     },
//     Completed : {
//         type : Boolean
//     }
// })

// const newTask = new Task ({
//     description : 'activity',
//     Completed : true
// })
// newTask.save().then(console.log(newTask)).catch((value)=> console.log(value))