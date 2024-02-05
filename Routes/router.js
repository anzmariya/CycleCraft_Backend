const express =require('express')
const userController = require('../Controller/userController')

const bikeController=require('../Controller/bikeController')

const AdminController=require('../Controller/adminController')

const jwtMiddleware=require('../Middleware/jwtMiddleware')

const multer=require('../Middleware/multerMiddleware')

const router=new express.Router()
    
    router.post('/register',userController.registerController)

    router.post('/login',userController.loginControl)

    router.post('/add-bike',jwtMiddleware,multer.single('image'),bikeController.addBikeController)

    router.get('/get-bikes',AdminController.getAdminBikes)

    router.get('/get-users',userController.getUsersDetails)

    

module.exports = router