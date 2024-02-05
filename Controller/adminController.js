const bikes = require('../Models/bikeModel')

// logic for adding bike
exports.getAdminBikes = async(req,res)=>{
    
    // console.log("get request");
    // res.status(200).json('recieved')
    try{
        const adminBikes=await bikes.find()
        res.status(200).json(adminBikes)
    }catch(error){
        res.status(401).json(`${error}`)
    }
}