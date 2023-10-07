const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncWrapper = require('../middleware/catchAsyncError1');
const ErrorHander=require("../utils/errorhandler")  
exports.processPayments = async (req, res, next) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'USD', 
        metadata: { integration_check: 'accept_a_payment'},
      });
  
      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret
      });
  
    } catch (error) {
      next(new ErrorHander(error.message, 400));
    }
  }

exports.sendStripeApi = asyncWrapper(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
});
