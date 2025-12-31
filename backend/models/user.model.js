const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

   uname: {
      String,
      require 
   },
   email:{

      String,
      require,
      unique
   },

   password:{
      String,
      require
   },
   
   createdAt: { type: Date, default: Date.now()
   }},{timestamps:true}
)

const User = mongoose.model('User',userSchema)

module.exports = User