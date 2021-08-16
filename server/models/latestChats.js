const mongoose = require("mongoose")

const lastestChatSchema = new mongoose.Schema({
    sender:{
        type:String,
        required:true,
    },
    recipient:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    dateSent:Number
})


module.exports = mongoose.model("latestChats",lastestChatSchema)