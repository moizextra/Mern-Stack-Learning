const Order=require("../models/OrderModel")
const Product=require("../models/ProductModel")
const ErrorHander=require("../utils/errorhandler");

// Controllers
exports.newOrder=async(req,res,next)=>{
const{shippinginfo,OrderItems,paymentInfo,ItemsPrice,TaxPrice,ShippingPrice,TotalPrice}=req.body
const order= Order.create({
    shippinginfo,OrderItems,paymentInfo,ItemsPrice,TaxPrice,ShippingPrice,TotalPrice,paidAt:Date.now(),user=req.user._id
})
res.status(200).json({
    success:true,
    order
})
}