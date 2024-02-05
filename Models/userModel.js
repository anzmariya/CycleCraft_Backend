const mongoose=require('mongoose')

const validator= require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'must be atleast 3 characters, got only {value}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    }
})

const users = mongoose.model('users',userSchema)

module.exports = users