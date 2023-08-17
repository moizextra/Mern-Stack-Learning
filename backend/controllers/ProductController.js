const Product = require("../models/ProductModel");
const ErrorHander = require("../utils/errorhandler");
const asyncErrorHandle=require("../middleware/catchasyncerror");
// Create Product Route Controller
// This route is  only for admin 
exports.CreateProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(221).json({ message: "Done", product })
}
// This route is  only for admin 
exports.UpdateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHander("Product not Found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: true
    })
    return res.status(200).json({
        message: "Updated Succesfylly",
        product
    })
}
exports.getAllProduct = async (req, res, next) => {
    const product = await Product.find();
    res.status(221).json({ message: "Done", product })
}
exports.DeleteProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
        res.status(200).json({
            success: true,
            message: "Product Delete Successfully",
        });
    }
}
exports.getProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
               return next(new ErrorHander("Product not found", 404));

    }
    res.status(200).send(product)
}