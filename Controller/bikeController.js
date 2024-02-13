const bikes = require('../Models/bikeModel')
const approves = require('../Models/approve')
const bookings = require('../Models/booked')
const mongoose=require('mongoose')

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

// get all user selfly added bikes
exports.getUserBikes = async(req,res)=>{
    const {userId} = req.payload;
    
    try{
        const userBikes = await bikes.find({userId})
        

        const allbikes =userBikes;

        res.status(200).json(allbikes);
        
    }catch(error) {
        res.status(500).json(`${error}`);
    }
};

exports.removeBike = async (req, res) => {
    try {
        const { bikeId } = req.params;

        const isValidObjectId = mongoose.Types.ObjectId.isValid(bikeId);

        if (!isValidObjectId) {
            return res.status(400).json({ message: 'Invalid bikeId' });
        }

        // If the bikeId is valid, you can proceed with the removal
        const deletedBike = await bikes.findByIdAndDelete(bikeId);

        if (deletedBike) {
            res.status(200).json({ message: 'Bike removed successfully', deletedBike });
        } else {
            res.status(404).json({ message: 'Bike not found' });
        }
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
};

exports.addtobooked = async (req, res) => {
    try {
        // Extract parameters from the request
        const { bikeId } = req.params
        const userId  = req.payload
        console.log(userId);

        // Find the original bike by ID
        const originalBike = await approves.findById(bikeId);

        // Check if the bike exists
        if (!originalBike) {
            return res.status(404).json({ error: 'Bike not found' });
        }

        // Create a new booking based on the original bike's details
        const booked = new bookings({
            compname: originalBike.compname,
            modelname: originalBike.modelname,
            ppd: originalBike.ppd,
            des: originalBike.des,
            bikecity: originalBike.bikecity,
            image: originalBike.image,
            bikeAddedBy: originalBike.userId,
            userId
        });

        // Save the new booking
        const added = await booked.save();

        // Respond with the added booking details
        res.status(200).json(added);
    } catch (error) {
        // Handle errors by responding with a 500 Internal Server Error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};