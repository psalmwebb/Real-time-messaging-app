const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        minLength:[2,"Username too short"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email field is required"],
        validate:[isEmail,"Enter a valid email address"],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password field is required"],
        minLength:[6,"Password length must be greater than six"]
    },
    contacts:{
        type:Array,
        required:false,
    }
})

userSchema.pre("save",async function()
{

  let salt = await bcrypt.genSalt()

  let hashedPass = await bcrypt.hash(this.password,salt)

  this.password = this.isNew ? hashedPass : this.password

})

userSchema.statics.login = async function({username,password})
{
  let user = await this.findOne({username:username})

  if(user){
      return bcrypt.compareSync(password,user.password) ? user : false
  }

  return false
}


module.exports=mongoose.model("users",userSchema)


