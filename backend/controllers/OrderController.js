const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const ErrorHander = require("../utils/errorhandler");

// Controllers
exports.newOrder = async (req, res, next) => {
    const { shippinginfo, OrderItems, paymentInfo, ItemsPrice, TaxPrice, ShippingPrice, TotalPrice } = req.body
    const order = Order.create({
        shippinginfo, OrderItems, paymentInfo, ItemsPrice, TaxPrice, ShippingPrice, TotalPrice, paidAt: Date.now(), user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })
}
// getting Single User
exports.getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email"); // Here What is happining is that we have user field in order i will go in user model and popultae name and email from AS SAID IN CODE
        if (!order) {
            return next("Order Not found with this id", 404);
        }
        res.json({
            Sucess: true,
            order
        })
    } catch (err) {
        return next(new ErrorHander(err.message, 500))
    }

}
// Now getting order of particular user which is loggedIn
exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }) // Here What is happining is that we have user field in order i will go in user model and popultae name and email from AS SAID IN CODE
    if (!orders) {
        return next("Order Not found with this id", 404);
    }
    res.status(201).json({
        Success: true,
        orders
    })
}
// getAllOrders (for Admin to get All placed Orders)
exports.getAllOrders=async()=>{
const orders=Order.find();
let TotalAmount=0;
orders.forEach((order)=>{
TotalAmount+=order.TotalPrice;
})
res.status(201).json({
    Success: true,
    TotalAmount,
    orders
})
}
// Update Order Status (Admin Route)
exports.UpdateOrder=async(req,res,next)=>{
const order=Order.find(req.params.id);
if(order.OrderStatus == "Delivered"){
return next(new ErrorHander("You have Already Delivered the Order",400))
}
order.OrderItems.forEach(async(order)=>{
await updateStock(order.product,order.quantity); // order.product is id
})
order.OrderStatus =req.body.status;  // admin will give response in the body
if(req.body.status == "Delivered"){
    order.deliveredAt=Date.now();
}
await order.save({validateBeforeSave});
res.status(201).json({
    Success: true,
    TotalAmount,
    order
})
}
const updateStock=async(id,quantity)=>{
const product=await Product.findById(id);
product.Stock-=quantity;
 await product.save({validateBeforeSave})
}
// Delete Orders -- Admin
exports.DeleteOrder=async(req,res,next)=>{
    const order=Order.findById(req.params.id);
    if (!order) {
        return next("Order Not found with this id", 404);
    }
    await order.remove();
    res.status(201).json({
        Success: true,
        TotalAmount,
        order
    })
    }