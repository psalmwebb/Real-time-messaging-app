
const {Router,json} = require("express")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const User = require("../models/users")
const userChats = require("../models/userChats")
const lastestChats = require("../models/latestChats")
const {authenticate,verifyToken} = require("./auths/authUser")
const router = Router()
const mongoose = require("mongoose")


router.get("/all-users",(req,res)=>{

    res.send("all users")
})


router.post("/signup",json(),async (req,res)=>{
    
    const {username,email,password} = req.body


    let user = null

    try{
       user = await User.create({
            username,
            email,
            password
       })

       let token = authenticate(user)

       res.cookie("jwt",token,{
           httpOnly:true,
           maxAge:3000 * 60 * 60 * 24
       })

       res.status(200).json(user)
    }
    catch(e){
        let errors = {}

        if(e.code === 11000){
            errors[Object.keys(e.keyValue)[0]] = `${Object.keys(e.keyValue)[0]} already exist.`

            res.json({errors})
        }
        else{
            Object.values(e.errors).forEach((error)=>{
                errors[error.properties.path] = error.properties.message
            })

            res.json({errors})
        }
    }
})


router.post("/login",json(),async (req,res)=>{

    let user = await User.login(req.body)

    if(user){
        token = authenticate(user)
        res.cookie("jwt",token,{httpOnly:true,maxAge:3000 * 60 * 60 * 24})
        res.status(200).json({user})
    }
    else res.json({"error":"Invalid Credentials..."})
})


router.get("/is-logged-in",cookieParser(),async (req,res)=>{
    let jwt = req.cookies.jwt

    if(!jwt) return res.json({"message":"User not logged In.."})

    let decodedToken = verifyToken(jwt)

    // console.log(decodedToken)

    if(decodedToken){
        user = await User.findById(decodedToken.id)
        
        // console.log(user)

        user ? res.json({user}) : res.status(500).json({"message":"There was an error..."})
    }
    else{
        res.json({"message":"User not logged in.."})
    }
})


router.put("/update-user/add-contact",cookieParser(),async (req,res)=>{
    let jwt = req.cookies.jwt

    if(!jwt) return res.json({"message":"User not logged In"})

    let decodedToken = verifyToken(jwt)

    let contactToAdd = req.query.contact.toLowerCase()

    if(decodedToken){
        user = await User.findById(decodedToken.id)

        isValidContact = await User.findOne({username:contactToAdd})

        if(user.username === contactToAdd) return res.json({"error":"You can't add yourself.."})

        if(!isValidContact) return res.json({"error":"This contact is not on PW-MESSENGER !"})

        if(user.contacts.includes(contactToAdd)) return res.json({"error":"This user is already on your contact list"})

        user.contacts.push(contactToAdd)

        updatedUser = await user.save()

        res.json({updatedUser})
    }
    else res.json({"message":"User not logged In"})
})


router.post("/update-chats/add-chats",json(),cookieParser(),(req,res)=>{
    
    const {sender,recipient,message,dateSent} = req.body
    
    try{
        let chat = userChats.create({
            sender,
            recipient,
            message,
            dateSent
        })
        res.status(200).json({"message":"saved.."})
    }
    catch(e){
        console.log("Error : "+ e.message)
        res.status(403).json({"message":"There was an error..."})
    }
})

router.post("/find-chats",json(),cookieParser(),async (req,res)=>{

    const {sender,recipient} = req.body

    let fromSender = await userChats.find({sender:sender,recipient:recipient})
    let fromRecipient = await userChats.find({sender:recipient,recipient:sender})

    let allChats = [...fromSender,...fromRecipient].sort((a,b)=> a.dateSent - b.dateSent)

    // console.log(allChats)

    res.json({"chats":allChats})
})


router.post("/save-latest-chat",json(),cookieParser(),async (req,res)=>{
    const {sender,recipient,message,dateSent} = req.body

    console.log("Received")
    
    let lastestFromS = await lastestChats.findOne({sender:sender,recipient:recipient})
    let lastestFromR = await lastestChats.findOne({recipient:sender,sender:recipient})

    let lChat = null

    if(lastestFromS || lastestFromR)
    {
        lChat = lastestFromS ? lastestFromS : lastestFromR
        lChat.sender = sender
        lChat.recipient = recipient
        lChat.message = message
        lChat.dateSent = dateSent
        lChat.save().then(()=> res.status(200).json({'message':'updated latest chats'}) )
    }
    else{
       lastestChats.create({
           sender,
           recipient,
           message,
           dateSent
       }).then(()=> res.status(200).json({"message":"Created lastest chats..."}) )
    }

})

router.post("/get-lastest-chat",json(),async (req,res)=>{
     const {user} = req.body

     const fromUser = await lastestChats.find({sender:user})
     const toUser = await lastestChats.find({recipient:user})

     let allLatestChats = [...fromUser,...toUser].sort((a,b)=> b.dateSent - a.dateSent)

     res.json({"latest":allLatestChats})
})

router.get("/logout",(req,res)=>{
   
   res.cookie("jwt","",{
       maxAge:1,
       httpOnly:true
   })
   res.send("You are logged out...")
})


module.exports = router