const User = require("../models/user.model.js");
const { comparePassword } = require("../utils/password.js");


//handling user profile 

async function handleUserProfile (req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {handleUserProfile};

//handling change password
async function handleChangePassword (req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
   
    //Find user by id
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Compare old password if matches
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { handleUserProfile, handleChangePassword };