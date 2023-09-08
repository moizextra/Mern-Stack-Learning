const ErrorHander = require("../utils/errorhandler");
const User = require("../models/userModels");
const sendGeneratedToken = require("../utils/sendtoken");
const crypto=require("crypto");
const sendEmail = require("../utils/sendemail") ;
// Register a User
exports.registerUser =
    async (req, res, next) => {
        try{
            const { name, password,email } = req.body;
            const user = await User.create({
                name,
                email,
                password,
                avatar:{
                    public_id:"sampleid",
                    url:"url"
                }
              });
            // getting token by running method we have defined in jwt
            sendGeneratedToken(user, 200, res);
       
        }catch(error){
            return next(new ErrorHander(error.message,500))
        }
    }
exports.LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // checking if user and password both exist or not
        if (!password || !email) {
            return next(new ErrorHander("Please Enter Email or Password", 400))
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHander("User doesnot exist",404))
        }
        const IsPasswordMatched = user.camparepassword(password);
        if (!IsPasswordMatched) {
            return next(new ErrorHander("Invalid Email or Password",500))
        }
        sendGeneratedToken(user, 200, res);
    } catch (error) {
        return next(new ErrorHander(error,500))
    }

}
exports.Logout = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        sucess: true,
        message: "Logout Successfully"
    })
}
// Forgot Password
exports.ForgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new ErrorHander("User doesn't exist", 404)); 
        }
        // Get resetPassword Token
        const resetToken =  await user.GeneratePasswordResetToken();
        await user.save({ validateBeforeSave: false }); // *
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        const message = `Your Password Reset Token: ${resetPasswordUrl}\n\nIf you have not requested to reset your password, please ignore this email. Have a nice day!`;

        try {
            await sendEmail(user.email, "Mern stack Course - Password Reset", message);

        } catch (error) {
            // Handle error sending email
            user.resetpasswordToken = undefined;
            user.resetpasswordexpire = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new ErrorHander(error.message, 500));
        }
    } catch (error) {
        // Handle other errors
        return next(new ErrorHander(error.message, 500));
    }
};
exports.ResetPassword = async (req, res, next) => {
    try {
        // Creating hash of token that is received by user
        console.log(req.params.token);
        // const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({ resetpasswordToken: req.params.token, resetpasswordexpire: { $gt: Date.now() } });


        if (!user) {
            return next(new ErrorHander("Reset Password Token is Invalid or has been expired :(", 400));
        }

        if (req.body.password !== req.body.confirmpassword) {
            return next(new ErrorHander("Passwords do not match :(", 400));
        }

        user.password = req.body.password;
        user.resetpasswordToken = undefined;
        user.resetpasswordexpire = undefined;
        await user.save();
        sendGeneratedToken(user, 200, res); // Login
    } catch (error) {
        return next(new ErrorHander(error.message, 500));
    }
}
exports.getUserDetail=async(req,res,next)=>{
const user=await User.findById(req.user.id)

res.status(200).json({
    success:true,
    user
})
}
exports.UpdatePassword=async(req,res,next)=>{
const user=await User.findById(req.user.id).select("+password")
const IsPasswordMatched = user.camparepassword(req.body.oldPassword);
if (!IsPasswordMatched) {
    return next(new ErrorHander("InCorrect Old Password",500))
}
if(req.body.password != req.body.confirmpassword){
    return next(new ErrorHander("Passwords donot match",400))
}
user.password=req.body.password;
await user.save();
sendGeneratedToken(user,200,res)
res.status(200).json({
    success:true,
    user
})
}
exports.UpdateProfile=async(req,res,next)=>{
const newUserData={
    name:req.body.name,
    email:req.body.email,
     // Todo: we will add avatar later
}
const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
});
res.status(200).json({
    success:true,
    user
})
}
// if admin wants all users (admin)
exports.GetAllUsers=async(req,res,next)=>{
const users=await User.find();
res.status(200).json({
    success:true,
    users
})
}
// Now Admin wants to access only one particular User
exports.GetUser=async(req,res,next)=>{
const user=await User.findById(req.params.id);
if(!user){
    return next(new ErrorHander("User dont exist",404))
}
res.status(200).json({
    success:true,
    user
})
}
// This route is for admin if he wants to update the profile of Users usually admin will update user Role
exports.UpdateUserProfile=async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
         // Todo: we will add avatar later
    }
    const user= await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
     await user.save()
    res.status(200).json({
        success:true,
        user
    })
    }
// This route is for admin if he wants to delete the profile of User 
exports.DeleteUser=async(req,res,next)=>{

    const user= await User.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new ErrorHander("User Dont exist",404))
    }

    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
    }

