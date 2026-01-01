
const User = require('../models/user.model.js')
const { hashPassword, comparePassword } = require('../utils/password.js')
const {generateToken,verifyToken} = require('../utils/jwt.js')

//handles user signup
async function handleUserSignup(req, res) {
  try {
    const { uname, email, password } = req.body;
    const encryptedPassword = await hashPassword(password);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new user
    const newUser = new User({ uname, email, password: encryptedPassword });
    await newUser.save();

    //generates jwt tokens
    const token = generateToken({ id: newUser._id, email: newUser.email });

    return res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


//handling user login

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken({ id: user._id, email: user.email });
    
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports= {handleUserSignup,handleUserLogin}