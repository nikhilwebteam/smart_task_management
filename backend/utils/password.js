const bycrpt = require('bcrypt')
const SALT_ROUNDS = 10

//function for hashing password
async function hashPassword (plainPassword){
   const hashedPassword = bycrpt.hash(plainPassword,SALT_ROUNDS)
   return hashedPassword
}

//function for comparing password
async function comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bycrpt.compare(plainPassword, hashedPassword);
    return isMatch;
}

module.exports= { hashPassword,comparePassword}