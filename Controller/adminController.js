const admins = require('../Models/admin')
const bikes = require('../Models/bikeModel')
const jwt = require('jsonwebtoken')

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

exports.adminLogin = async (req, res) => {
    console.log('inside admin login function');

    const { email, password } = req.body;

    try {
        const existingUser = await admins.findOne({email,password });

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, "anzsecretkey5500");
            res.status(200).json({
                existingUser,
                token
            });
        } else {
            res.status(404).json('Invalid email id or password');
        }
    } catch (err) {
        res.status(401).json('Login request failed due to: ' + err);
    }
}