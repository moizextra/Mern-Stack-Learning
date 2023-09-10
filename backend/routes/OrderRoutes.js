const express=require("express")
const router=express.Router();
const {IsAuthenticated,authorizedRoles} =require("../middleware/auth");
const { newOrder } = require("../controllers/OrderController");

router.route("/order/new").post(IsAuthenticated,newOrder)




module.exports=router;