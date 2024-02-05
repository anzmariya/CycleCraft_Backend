const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log('inside jwt middleware');

    // logic to get token
    const token=req.headers['authorization'].split(' ')[1]
    console.log(token);
    try{
        const jwtResponse=jwt.verify(token,"anzsecretkey5500")
        console.log(jwtResponse);
        req.payload=jwtResponse.userId
        next()
    }catch(err){
        res.status(401).json('Authorization failed')
    }
}

module.exports=jwtMiddleware