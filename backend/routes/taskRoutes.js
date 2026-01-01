const express = require('express');
const router = express.Router()
const {handleCreateTask,handleGetAllTasks,handleGetTaskById,handleUpdateTask, handleDeleteTask} = require('../controllers/task.controller')

router.post("/",handleCreateTask)
router.get("/",handleGetAllTasks)
router.get("/:id",handleGetTaskById)
router.put("/:id",handleUpdateTask)
router.delete("/:id",handleDeleteTask)
module.exports = router