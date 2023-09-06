const express=require("express");
const { registerUser,LoginUser,Logout,ForgotPassword,ResetPassword} = require("../controllers/UserController");
const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/forgotpassword").post(ForgotPassword); // forgot password route
router.route("/password/reset/:token").put(ResetPassword); // forgot password route
router.route("/logout").get(Logout);

module.exports=router 