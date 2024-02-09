const approves = require("../Models/approve");
const bikes = require("../Models/bikeModel");
const bookings = require("../Models/booked");

exports.addtoBooked = async (req, res) => {
    try {
        const { bikeId } = req.params;
    
        const originalBike = await approves.findById(bikeId);
    
        if (!originalBike) {
          return res.status(404).json({ error: 'Bike not found' });
        }
       const bookedBike = new bookings({
          compname: originalBike.compname,
          modelname: originalBike.modelname,
          ppd: originalBike.ppd,
          des: originalBike.des,
          bikecity: originalBike.bikecity,
          image:originalBike.image,
          userId: originalBike.userId,
          status: 'booked', // Set the status to 'approved'
        });
    
        const savedBookedBike = await bookedBike.save();
  
    
        res.status(200).json(savedBookedBike);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  exports.getbookedbikes=async(req,res)=>{
    try {
        const booked=await bookings.find()
        res.status(200).json(booked)
    } catch (error) {
        res.status(401).json(`${error}`)
    }
  }