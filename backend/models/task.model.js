const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
   title: {
      String,
      require,
      unique
   },

   description: { String, },
   status: {
     type : String,
     enum : ['pending','in progress',"completed"],
     default: "pending"

   },
   priority: { 
      type : String,
     enum : ['low','medium',"high"],
     },

   isDeleted: {
      type : Boolean,
      default: false
   },
   userId: {
      String
   }
},{timestamps : true}
)

const Task = mongoose.model(
   'Task', taskSchema
)

module.exports = Task