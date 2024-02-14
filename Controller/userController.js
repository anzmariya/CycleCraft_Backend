const users = require('../Models/userModel')

const jwt=require('jsonwebtoken')

// logic for register
exports.registerController = async(req,res)=>{
    console.log('inside user controller register logic');
    // res.status(200).json('register request received')
    const {username,email,password,confirmPassword,phoneNumber,address} = req.body

    try{
        const existingUser =await users.findOne({email})

        if(existingUser){
            res.status(406).json('Account already Exist... please Login')
        }
        else{

            const newUser = new users({
                username,
                email,
                password,
                confirmPassword,
                phoneNumber,
                address
        })
        await newUser.save()
            // response
        res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json('register ',err)
    }   
}

exports.loginControl=async(req,res)=>{
    console.log('inside login function');
    // res.status(200).json('login request received')
    const{email,password}=req.body
    try{
        const existingUser=await users.findOne({email,password})

        if(existingUser){
            const token=jwt.sign({userId: existingUser._id},"anzsecretkey5500")
            res.status(200).json({
                existingUser,
                token
            })
        }
        else{
            res.status(404).json('invalid email id or password')
        }
    }
    catch(err){
        res.status(401).json('login request failed due to : ',err)
    }
}

exports.getUsersDetails=async(req,res)=>{
    // console.log('inside get user details');
    // res.status(200).json('user details received')
    try{
        const userDetails=await users.find()
        res.status(200).json(userDetails)
    }catch(err){
        res.status(401).json(`${err}`)
    }
}

exports.getUserDetailsById=async(req,res)=>{
    // console.log('inside get user details');
    // res.status(200).json('user details received')
    try{
        const userDetails=await users.findById(userId)
        res.status(200).json(userDetails)
    }catch(err){
        res.status(401).json(`${err}`)
    }
}
