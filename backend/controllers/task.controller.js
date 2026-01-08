const Task = require("../models/task.model.js");

// Create and Save a new Task
async function handleCreateTask(req, res) {
  try {
    const { title, description, status, priority,dueDate, assignedUser } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedUser,
      user: req.user.id,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already have a task with this title" });
    }
    res.status(500).json({ message: error.message });
  }
}

// Retrieve all Tasks
async function handleGetAllTasks(req, res) {
  try {
    const tasks = await Task.find({
      isDeleted: false,
      $or: [
        { user: req.user.id },          // tasks the user created
        { assignedUser: req.user.id },  // tasks assigned to the user
      ],
    }).populate("assignedUser", "uname email");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Retrieve a single Task by ID
async function handleGetTaskById(req, res) {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
      isDeleted: false
    }).populate("assignedUser", "uname email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Update a Task by ID
async function handleUpdateTask(req, res) {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(403).json({ message: "You cannot modify this task" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already have a task with this title" });
    }
    res.status(500).json({ message: error.message });
  }
}


// Delete a Task by ID (soft delete)
async function handleDeleteTask(req, res) {
  try {
    const deletedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedTask) {
      return res.status(403).json({ message: "You cannot delete this task" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  handleCreateTask,
  handleGetAllTasks,
  handleGetTaskById,
  handleUpdateTask,
  handleDeleteTask,
};