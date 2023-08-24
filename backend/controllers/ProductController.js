const Product = require("../models/ProductModel");
const ErrorHander = require("../utils/errorhandler");
// const asyncErrorHandle=require("../middleware/catchAsyncError1");
const Features = require("../utils/features");

// Create Product Route Controller
// This route is  only for admin 
exports.CreateProduct =
    async (req, res, next) => {
        try{
            req.body.user=req.user.id; // in the particular product we are setting its user field to user.id
            const product = await Product.create(req.body);
            res.status(221).json({ message: "Done", product })
        }catch(error){
next(error)
        }
}
// These routes is  only for admin 
// For Updating Partcular Product
exports.UpdateProduct =
    async (req, res, next) => {
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

// for getting All Products
exports.getAllProduct = async (req, res, next) => {
    try {
        const resultperpage=5; // Setting the Product per page
        const ProductCount=await Product.countDocuments()
        // First argument query and second argument
 const apifeatures= new Features(Product.find(),req.query).search().filter().Pagination(resultperpage); // Applying method we want to use here

// Here we can also give our search thing to  Product.find("samosa") but we will not bcz we require all the words such that samosamosa so thats why we class for handling it
        const products = await apifeatures.query;
        res.status(200).json({ message: "Success", products,ProductCount });
    } catch (error) {
        next(error); // Pass the error to the next middleware for proper error handling
    }
};

// for Deleting Product
exports.DeleteProduct = 
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
    
        if (!product) {
let error=new ErrorHander("Product not found", 404);
            return next(error);
        }
    
        product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({
                success: true,
                message: "Product Delete Successfully",
               
            });
        }
    }

// for getting one Product
exports.getProduct = 
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
        if (!product) {
                   return next(new ErrorHander("Product Not Found", 404));
        }
        res.status(200).send(product)
    }
