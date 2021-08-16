const jwt = require("jsonwebtoken")


const SECRET_KEY = "pw"

exports.authenticate = (user)=>{

  return jwt.sign({id:user._id},SECRET_KEY,{
      expiresIn:3000 * 60 * 60 * 24
  })
}


exports.verifyToken = (token)=>{
   
   let decodedToken = null

   jwt.verify(token,SECRET_KEY,(err,decryptedToken)=>{
      
      if(err) return 
      
      decodedToken = decryptedToken
   })
   
   return decodedToken
}