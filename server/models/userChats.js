const mongoose = require("mongoose")

const userChatsSchema = new mongoose.Schema({
   sender:{
       type:String,
       required:true,
       lowercase:true
   },
   recipient:{
       type:String,
       required:true,
       lowercase:true
   },
   message:{
       type:String,
       required:true
   },
   dateSent:{
       type:Number,
       required:true,
       default:Date.now()
   }
})

module.exports = mongoose.model("userChats",userChatsSchema)