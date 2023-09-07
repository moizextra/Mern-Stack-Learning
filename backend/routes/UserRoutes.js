const express=require("express");
const { registerUser,LoginUser,Logout,ForgotPassword,ResetPassword,getUserDetail,UpdatePassword} = require("../controllers/UserController");
const  {IsAuthenticated} =require( "../middleware/auth")
const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/forgotpassword").post(ForgotPassword); // forgot password route
router.route("/password/reset/:token").put(ResetPassword); // forgot password route
router.route("/logout").get(Logout);
router.route("/me").get(IsAuthenticated,getUserDetail)
router.route("/password/update").get(IsAuthenticated,UpdatePassword)

module.exports=router 