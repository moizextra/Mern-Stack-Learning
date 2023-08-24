const ErrorHander = require("../utils/errorhandler");
const User = require("../models/userModels");
const sendGeneratedToken = require("../utils/sendtoken")
const sendEmail = require("../utils/sendemail") 
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
            return next(new ErrorHander("User doesnot exist"))
        }
        const IsPasswordMatched = user.camparepassword(password);
        if (!IsPasswordMatched) {
            return next(new ErrorHander("Invalid Email or Password"))
        }
        sendGeneratedToken(user, 200, res);
    } catch (error) {
        return next(new ErrorHander(error))
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
exports.ForgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new ErrorHander("User doesn't exist", 404)); // Fix typo here
        }
        // Get resetPassword Token
        const resetToken = user.GeneratePasswordResetToken();
        console.log(resetToken); // Check the implementation of this function
        await user.save({ validateBeforeSave: false });
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
        const message = `Your Password Reset Token: ${resetPasswordUrl}\n\nIf you have not requested to reset your password, please ignore this email. Have a nice day!`;

        try {
            await sendEmail({
                email: user.email,
                Subject: "Mern stack Course",
                message
            });
            res.status(200).json({
                success: true,
                message: "Email sent. Please check your inbox."
            });
        } catch (error) {
            // Handle error sending email
            return next(new ErrorHander(error.message, 500));
        }
    } catch (error) {
        // Handle other errors
        return next(new ErrorHander(error.message, 500));
    }
};