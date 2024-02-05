const bikes = require('../Models/bikeModel')

// logic for adding bike
exports.addBikeController = async(req,res)=>{
    // console.log('inside add bike controller logic');
    // res.status(200).json('add-bike request received')
    const userId =req.payload
    console.log(userId);
    const image = req.file.filename
    const {compname,modelname,ppd,des,bikecity} = req.body

    try{

            const newBike = new bikes({
                compname,
                modelname,
                ppd,
                des,
                bikecity,
                image,
                userId
      })
       await newBike.save()
           // response
        res.status(200).json(newBike)
    }catch(err){
         res.status(401).json(`${err}`)
    }   
}