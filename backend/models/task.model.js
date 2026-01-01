const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
 priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true
  }
}, { timestamps: true   
});

// Compound index to ensure unique task titles per user
taskSchema.index({ user: 1, title: 1 }, { unique: true });

Task = mongoose.model("Task", taskSchema);
module.exports = Task;