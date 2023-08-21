const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require("validator")
const bcrypt = require("bcryptjs") ;
const crypto=require("crypto");
// Here we will encrpyt the password before sending it into database(Mongodb)
const jwt=require("jsonwebtoken")
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Your Name"],
        minLenght: [3, "Your Name should have Minimum three Characters"],
        maxLenght: [30, "Your Name should not exceed  Maximun thirty Characters"],

    },
    password: {
        type: String,
        required: [true, "Your Passowrd should have minimun eight characters"],
        select: false, // it shows that when in mongodb we run a specific query to get users it will us all detil except password
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Enter Your Email"],
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true

        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetpasswordToken: {
        type: String,
    },
    resetpasswordexpire: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.Now
    }
});
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
next();
    }
    // sending hashed password to Database
    this.password = await bcrypt.hash(this.password, 10); // Here 10 is salt 

})
// send JWT token
// making methods in schema 
UserSchema.methods.sendjwttoken=function(){
return jwt.sign({id:this._id},process.env.JWT_SCRECT_KEY,{
    expiresIn:process.env.JWT_EXPIRES_IN
})  // sign() takes payload inside it
}
UserSchema.methods.camparepassword= async function(enteredpassword){
return  await bcrypt.compare(enteredpassword,this.password)
}
UserSchema.methods.GeneratePasswordResetToken= async function(){
// Generating token
const Token=crypto.randomBytes(20).toString("hex")
  // for converting into readable String
  const cryptoToken=crypto.createHash("sha256").update(Token).digest("hex");
this.resetpasswordToken=cryptoToken;
this.resetpasswordexpire=Date.now()+15*60*1000;
return cryptoToken;

}
module.exports = mongoose.model("User", UserSchema);
