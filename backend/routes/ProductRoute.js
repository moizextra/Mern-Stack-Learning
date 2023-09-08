const express=require("express");
const { getAllProduct,CreateProduct,UpdateProduct,DeleteProduct,getProduct,CreateProductReview } = require("../controllers/ProductController");
const {IsAuthenticated,authorizedRoles} =require("../middleware/auth")
const router=express.Router();
router.route("/products").get(getAllProduct);
router.route("/product/new").post(IsAuthenticated,CreateProduct);
router.route("/product/:id").put(IsAuthenticated,UpdateProduct).delete(IsAuthenticated,DeleteProduct).get(getProduct);
router.route("/review").put(IsAuthenticated,CreateProductReview)

module.exports=router ;