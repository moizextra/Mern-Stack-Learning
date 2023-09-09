const Product = require("../models/ProductModel");
const ErrorHander = require("../utils/errorhandler");
// const asyncErrorHandle=require("../middleware/catchAsyncError1");
const Features = require("../utils/features");

// Create Product Route Controller
// This route is  only for admin 
exports.CreateProduct =
    async (req, res, next) => {
        try
        {
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
        res.status(200).json({ message: "Success", products,ProductCount,resultperpage });
    } catch (error) {
        next(new ErrorHander(error.message,500)); // Pass the error to the next middleware for proper error handling
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


    // Route for Adding or Updatting Review
 exports.CreateProductReview = async (req, res, next) => {
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        };
    
        try {
            const product = await Product.findById(productId);
    
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
    
            const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    
            if (isReviewed) {
                // Update existing review
                product.reviews.forEach((existingReview) => {
                    if (existingReview.user.toString() === req.user._id.toString()) {
                        existingReview.rating = rating;
                        existingReview.comment = comment;
                    }
                });
            } else {
                product.reviews.push(review);
            }
    
            product.noOfReviews = product.reviews.length;
    
            let avg = 0;
            product.reviews.forEach((review) => {
                avg += review.rating;
            });
            product.ratings = avg / product.reviews.length;
    
            await product.save();
    
            res.status(200).json({ success: true, product });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };
    exports.getAllProductReviews = async (req, res, next) => {
        const productId = req.params.productId; // Assuming the product ID is in the URL
        try {
            const product = await Product.findById(productId);
    
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
    
            const reviews = product.reviews;
    
            res.status(200).json({ success: true, reviews });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };
    // If admin wants ton delete particular Bad review
    exports.deleteReview = async (req, res, next) => {
        const product = await Product.findById(req.query.productId);
      
        if (!product) {
          return next(new ErrorHander("Product not found", 404));
        }
       // This function will take review id and product id
        const reviews = product.reviews.filter(
          (rev) => rev._id.toString() !== req.query.id.toString()
        );
      
        let avg = 0;
      
        reviews.forEach((rev) => {
          avg += rev.rating;
        });
      
        let ratings = 0;
      
        if (reviews.length === 0) {
          ratings = 0;
        } else {
          ratings = avg / reviews.length;
        }
      
        const numOfReviews = reviews.length;
      
        await Product.findByIdAndUpdate(
          req.query.productId,
          {
            reviews,
            ratings,
            numOfReviews,
          },
          {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          }
        );
      
        res.status(200).json({
          success: true,
        });
      };
    
    
