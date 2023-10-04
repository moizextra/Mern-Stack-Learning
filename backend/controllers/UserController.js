const ErrorHander = require('../utils/errorhandler');
const User = require('../models/userModels');
const cloudinary = require('cloudinary');
const sendGeneratedToken = require('../utils/sendtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendemail');
const asyncWrapper = require('../middleware/catchAsyncError1');
// Register a User
exports.registerUser = asyncWrapper(async (req, res, next) => {
    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale',
    });
    const { name, password, email } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });
    // getting token by running method we have defined in jwt
    sendGeneratedToken(user, 200, res);
});

exports.LoginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if either email or password is missing
    if (!password || !email) {
        return next(new ErrorHander('Please Enter Email and Password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHander('User does not exist', 404));
    }

    // Check if the provided password matches the stored password
    const IsPasswordMatched = await user.comparepassword(password);

    if (!IsPasswordMatched) {
        return next(new ErrorHander('Invalid Email or Password', 401)); // 401 for unauthorized
    }

    // Password is correct, generate and send a token
    sendGeneratedToken(user, 200, res);
});
exports.Logout = asyncWrapper(async (req, res, next) => {
    const cookieOptions = {
        expires: new Date(Date.now()),
        domain: 'localhost',
        path: '/api/v1',
        httpOnly: true, // Limit the cookie to be accessible only through HTTP
        sameSite: 'None', // Allow cross-origin cookies (if applicable)
    };
    res.cookie('token', null, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    })
        .status(200)
        .json({
            success: true,
        });
});
// Forgot Password
exports.ForgotPassword = asyncWrapper(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHander("User doesn't exist", 404));
    }
    // Get resetPassword Token
    const resetToken = await user.GeneratePasswordResetToken();
    await user.save({ validateBeforeSave: false }); // *
    const resetPasswordUrl = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/password/reset/${resetToken}`;
    const message = `Your Password Reset Token: ${resetPasswordUrl}\n\nIf you have not requested to reset your password, please ignore this email. Have a nice day!`;

    try {
        await sendEmail(
            user.email,
            'Mern stack Course - Password Reset',
            message
        );
    } catch (error) {
        // Handle error sending email
        user.resetpasswordToken = undefined;
        user.resetpasswordexpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHander(error.message, 500));
    }
});
exports.ResetPassword = asyncWrapper(async (req, res, next) => {
    // Creating hash of token that is received by user
    console.log(req.params.token);
    // const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetpasswordToken: req.params.token,
        resetpasswordexpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHander(
                'Reset Password Token is Invalid or has been expired :(',
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmpassword) {
        return next(new ErrorHander('Passwords do not match :(', 400));
    }

    user.password = req.body.password;
    user.resetpasswordToken = undefined;
    user.resetpasswordexpire = undefined;
    await user.save();
    sendGeneratedToken(user, 200, res); // Login
});
exports.getUserDetail = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});
exports.UpdatePassword = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    const IsPasswordMatched = user.camparepassword(req.body.oldPassword);
    if (!IsPasswordMatched) {
        return next(new ErrorHander('InCorrect Old Password', 500));
    }
    if (req.body.password != req.body.confirmpassword) {
        return next(new ErrorHander('Passwords donot match', 400));
    }
    user.password = req.body.password;
    await user.save();
    sendGeneratedToken(user, 200, res);
    res.status(200).json({
        success: true,
        user,
    });
});
exports.UpdateProfile = asyncWrapper(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        // Todo: we will add avatar later
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        user,
    });
});
// if admin wants all users (admin)
exports.GetAllUsers = asyncWrapper(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});
// Now Admin wants to access only one particular User
exports.GetUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHander('User dont exist', 404));
    }
    res.status(200).json({
        success: true,
        user,
    });
});
// This route is for admin if he wants to update the profile of Users usually admin will update user Role
exports.UpdateUserProfile = asyncWrapper(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        // Todo: we will add avatar later
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    await user.save();
    res.status(200).json({
        success: true,
        user,
    });
});
// This route is for admin if he wants to delete the profile of User
exports.DeleteUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ErrorHander('User Dont exist', 404));
    }

    res.status(200).json({
        success: true,
        message: 'User Deleted Successfully',
    });
});
