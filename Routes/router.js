const express =require('express')
const userController = require('../Controller/userController')
const bikeApproval = require('../Controller/approveController')
const bikeController=require('../Controller/bikeController')
const AdminController=require('../Controller/adminController')
const jwtMiddleware=require('../Middleware/jwtMiddleware')
const multer=require('../Middleware/multerMiddleware')

const router=new express.Router()
    
    router.post('/register',userController.registerController)
    router.post('/login',userController.loginControl)
    router.post('/adminlogin',AdminController.adminLogin)
    router.post('/add-bike',jwtMiddleware,multer.single('image'),bikeController.addBikeController)
    router.get('/get-bikes',AdminController.getAdminBikes)
    router.get('/get-users',userController.getUsersDetails)
    router.get('/get-users/:userId',userController.getUserDetailsById)
    // router.get('/get-userbikes/:userId',jwtMiddleware,bikeController.getUserBikes)
    router.post('/approvedBike/:bikeId',bikeApproval.addtoapproved)
    // router.post('/bookedBike/:bikeId',booking.addtoBooked)
    // router.get('/getbookedbikes',booking.getbookedbikes)
    router.delete('/delete/:bikeId',bikeController.removeBike)
    router.get('/all-approved/bikes',bikeApproval.getapprovedBikes)
    router.post('/bookedBike/:bikeId/:userId',jwtMiddleware,bikeController.addtobooked)
    router.get('/all-approved/bike/:bikeId',bikeApproval.approvedBikebyid)
    router.get('/booked/bikes/:userId',jwtMiddleware,bikeController.getBookedBikesByUser)
    router.delete('/delete/bookedBike/:bikeId',bikeController.removeBookedBikeFromApproves)
    router.get('/added/bikes/:userId',jwtMiddleware,bikeController.getAddedBikesByUser)


    

module.exports = router