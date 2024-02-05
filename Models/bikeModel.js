const mongoose=require('mongoose')

const validator= require('validator')

const bikeSchema = new mongoose.Schema({
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
    }
})

const bikes = mongoose.model('bikes',bikeSchema)

module.exports = bikes