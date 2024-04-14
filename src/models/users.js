const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Timestamp } = require('mongodb')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        lowercase : true
    },
    age : {
        type : Number
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 7,
        validate(value){
            if (value.includes('password')){
                throw new Error (" password should not contain password keyword")
            }
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        
        validate(value){
          if(!validator.isEmail(value)){
                 throw new Error ("enter valid email address")
          }
        }
    },
    
    tokens : [{
        token : {
            type : String,
            required: true
        }

    }]
},{
    Timestamps : true
})


userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id : user._id.toString()}, 'thisisnewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async function(email, password) {
    const User = this
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
const user = mongoose.model('users',userSchema)


module.exports = user