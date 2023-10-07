const express=require("express")
const router=express.Router();
const {IsAuthenticated} =require("../middleware/auth");
const {processPayments,sendStripeApi} =require("../controllers/paymentControllers")
router.route("/payment/process").post(processPayments)
router.route("/stripeapikey").get(sendStripeApi)
module.exports=router;