const express = require('express');
const app = express();
const cors = require("cors")
const {connectMongoDB} = require('./connection.js')

//middlewares
app.use(cors())

//routes
app.get("/",(req,res)=> {
   return res.send({message:"hellow from server"})
})

app.use()

//connecting mongodb
connectMongoDB()

app.listen(process.env.PORT,()=>{
   console.log(`Server is running on port ${process.env.PORT}`);
})
