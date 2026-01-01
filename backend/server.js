const express = require('express');
const app = express();
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')
const {} = require('./middleware/auth.middleware.js');
const authenticate = require('./middleware/auth.middleware.js');
app.use(cors());

// Middleware to parse 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auth routes
app.use('/api/auth/',authRoutes)

//Protected routes
app.use('/api/tasks',authenticate,taskRoutes)


//test route
app.get("/",(req,res)=> {
   return res.send({message:"hellow from server"})
})



// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT,()=>{
   console.log(`Server is running on port ${process.env.PORT}`);
})
