const User = require("../models/user.model");

// Get all users
async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find({}, "uname email"); // only send needed fields
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  handleGetAllUsers,
};
