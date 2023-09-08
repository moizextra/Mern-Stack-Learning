const express=require("express");
const { registerUser,LoginUser,Logout,ForgotPassword,ResetPassword,getUserDetail,UpdatePassword,UpdateProfile, GetAllUsers, GetUser,DeleteUser,UpdateUserProfile} = require("../controllers/UserController");
const  {IsAuthenticated,authorizedRoles} =require( "../middleware/auth")
const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/forgotpassword").post(ForgotPassword); // forgot password route
router.route("/password/reset/:token").put(ResetPassword); // forgot password route
router.route("/logout").get(Logout);
router.route("/me").get(IsAuthenticated,getUserDetail)
router.route("/me/update").put(IsAuthenticated,UpdateProfile)
router.route("/password/update").put(IsAuthenticated,UpdatePassword)
// --Admin
router.route("/admin/users").get(IsAuthenticated,authorizedRoles("admin"),GetAllUsers) // admin accesing all users
router.route("/admin/user/:id").get(IsAuthenticated,authorizedRoles("admin"),GetUser) // admin accessing particular user
router.route("/admin/user/:id").delete(IsAuthenticated,authorizedRoles("admin"),DeleteUser) // Admin deleting the User
router.route("/admin/user/:id").put(IsAuthenticated,authorizedRoles("admin"),UpdateUserProfile) // Admin updating Particular User

module.exports=router 