const mongoose = require('mongoose')
async function connectMongoDB() {
   try {
      await mongoose.connect(process.env.MONGO_URI).then(() => {
         console.log("Connected to MongoDB")
      })
   }
   catch (err){
      console.log(`Error Occurred ${err}`)
   }

}

module.exports = { connectMongoDB }