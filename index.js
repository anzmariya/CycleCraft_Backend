require('dotenv').config()

const exp = require('express')

const cors = require('cors')

const router=require('./Routes/router')

require('./DB/connection')

const cycleServer = exp()

cycleServer.use(cors())

// middleware: it controls the request response cycle(only here)
cycleServer.use(exp.json())

cycleServer.use(router)

cycleServer.use('/fileuploads',exp.static('./fileuploads'))

const PORT = 4500 || process.env.PORT

cycleServer.listen(PORT,()=>{
    console.log(`server running successfully at ${PORT}`);
})

cycleServer.get('/',(req,res)=>{
    res.send(`<h1>Server sunning successfully and client request started</h1>`)
})