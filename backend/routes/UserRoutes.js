const express=require("express");
const { registerUser,LoginUser,Logout,ForgotPassword} = require("../controllers/UserController");
const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/forgotpassword").post(ForgotPassword); // Todo
router.route("/logout").get(Logout);

module.exports=router 