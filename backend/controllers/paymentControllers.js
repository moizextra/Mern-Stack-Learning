const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncWrapper = require('../middleware/catchAsyncError1');

exports.processPayments = asyncWrapper(async (req, res, next) => {
    const mypayment = await stripe.paymentsIntents.create({
        amount: req.body.amount,
        currency: 'USD',
        metadata: { integration_check: 'accept_a_payment' },
    });
    res.status(200).json({
        sucess: true,
        client_secret: mypayment.client_secret,
    });
});

exports.sendStripeApi = asyncWrapper(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
});
