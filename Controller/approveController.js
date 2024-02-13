const approves = require('../Models/approve');
const bikes = require('../Models/bikeModel');


exports.addtoapproved = async (req, res) => {
    try {
      const { bikeId } = req.params;
  
      const originalBike = await bikes.findById(bikeId);
  
      if (!originalBike) {
        return res.status(404).json({ error: 'Bike not found' });
      }
     const approvedBike = new approves({
        compname: originalBike.compname,
        modelname: originalBike.modelname,
        ppd: originalBike.ppd,
        des: originalBike.des,
        bikecity: originalBike.bikecity,
        image:originalBike.image,
        userId: originalBike.userId,
        status: 'approved', // Set the status to 'approved'
      });
  
      const savedApprovedBike = await approvedBike.save();

  
      res.status(200).json(savedApprovedBike);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getapprovedBikes=async(req,res)=>
{
    // console.log('get request');
    // res.status(200).json('received request')

    try {
        const approved=await approves.find()
        res.status(200).json(approved)
    } catch (error) {
        res.status(401).json(`${error}`)
    }
}

exports.approvedBikebyid = async (req, res) => {
  try {
      const { bikeId } = req.params; // Extract bikeId from request parameters

      // Assuming 'approves' is your Mongoose model
      const display = await approves.findById(bikeId);

      if (display) {
          res.status(200).json(display);
      } else {
          res.status(404).json({ message: 'Bike not found' });
      }
  } catch (err) {
      res.status(500).json({ error: `${err}` });
  }
};