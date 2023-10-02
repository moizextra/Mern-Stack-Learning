const express=require("express")
const router=express.Router();
const {IsAuthenticated} =require("../middleware/auth");
const {processPayments,sendStripeApi} =require("../controllers/paymentControllers")
router.route("/payment/process").post(IsAuthenticated,processPayments)
router.route("/stripeapikey").post(IsAuthenticated,sendStripeApi)
module.exports=router;