const express=require("express");
const { getAllProduct,CreateProduct,UpdateProduct,DeleteProduct,getProduct } = require("../controllers/ProductController");
const router=express.Router();
router.route("/products").get(getAllProduct);
router.route("/product/new").post(CreateProduct);
router.route("/product/:id").put(UpdateProduct).delete(DeleteProduct).get(getProduct);



module.exports=router 