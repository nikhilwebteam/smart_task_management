
const User = require('../models/user.model.js')

//handles user signup
async function handleUserSignUp(req,res) {
   const {uname,email,password} = req.body
  await  User.create(
      {
         uname : uname,
         email : email,
         password: password
      }
   )

   return res.status(200).json({message:"Registered"})
}

//handling user login

async function handleUserLogin (req,res)
{
   const {email, password} = req.body
   await  User.findOne(
      {
         email : email,
         password: password
      }
   )
   return res.status(200).json({message:"Logged In"})

}

module.exports= {handleUserSignUp,handleUserLogin}