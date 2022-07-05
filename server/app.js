const express = require("express")

const mongoose = require("mongoose")

const socket = require("socket.io")

const app = express()

const routes = require("./routes/routes")

const cors = require("cors")

const path = require("path")

require("dotenv").config()


let server;

let port = process.env.PORT || 5000

const dbPass = process.env.MONGODB_PASSWORD
const dbUser = process.env.MONGODB_USERNAME
const dbName = process.env.MONGODB_NAME

let remoteDbURL = `mongodb+srv://${dbUser}:${dbPass}@cluster0.gqtmu.mongodb.net/${dbName}?retryWrites=true&w=majority`

let localDbURL = 'mongodb://localhost/pw_messenger'


let rules ={
  origin:["http://localhost:3000"],
  credentials:true
}

app.use(cors(rules))


app.use(express.static(path.join(__dirname,"build")))

app.use("/api",routes)

app.get("*",(req,res)=>{
   
  res.setHeader("Content-Type","text/html")

  res.sendFile(path.join(__dirname,"build","index.html"))
})


mongoose.connect(remoteDbURL,{ useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connection.on("error",()=> console.log("There was an error"))

mongoose.connection.once("open",()=>{

  server = app.listen(port,()=> console.log(`serving at port : ${port}`))


  //  Setting up our socket connection for real-time communication...

  const io = socket(server,{
    cors:{
      origin:"http://localhost:3000",
      methods:["GET","POST"],
      credentials:true
    }
  })

  io.on("connection",socket=>{

    //  console.log("Client Connected : " + socket.handshake.query.username)

    console.log("client connected")

     socket.join(socket.handshake.query.username)

     socket.on("send-message",(mObj)=>{
        
        // console.log(`message was sent to ${mObj.recipient}`)

        socket.to(mObj.recipient).emit("receive-message",mObj)
     })

     socket.on("typing",(recipient)=>{
        socket.to(recipient).emit("typing");
     })

    
    socket.on("disconnect",()=>{
      //  console.log("Client disconnected : "+ socket.handshake.query.username)
    })

  })
  
})


