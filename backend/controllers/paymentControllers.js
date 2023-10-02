const stripe =require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayments=async(req,res,next)=>{
    try{
const mypayment=await stripe.paymentsIntents.create({
amount:req.body.amount,
currency:"USD",
metadata:{integration_check:"accept_a_payment"}})
res.status(200).json({
sucess:true,
client_secret:mypayment.client_secret,
})

    }catch{

    }
}
exports.sendStripeApi=async(req,res,next)=>{
res.status(200).json({
    stripeApiKey:process.env.STRIPE_API_KEY
})

}