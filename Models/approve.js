const mongoose=require('mongoose')

const validator= require('validator')

const approveSchema = new mongoose.Schema({
    compname:{
        type:String,
        require:true
    },
    modelname:{
        type:String,
        require:true
    },
    ppd:{
        type:String,
        require:true
    },
    des:{
        type:String,
        require:true
    },
    bikecity:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    }
})

const approves = mongoose.model('approves',approveSchema)

module.exports = approves