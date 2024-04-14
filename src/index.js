const express = require('express')
require("./db/mongoose.js")

const userRouter = require('./routers/users.js')

const taskRouter = require('./routers/tasks.js')

const auth = require("./middleware/auth.js")

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT | 3000
app.use(express.json())


app.listen(port,()=>{
    console.log('server is up and running on port' + port)
})