const express=require("express")
const router=express.Router();
const {IsAuthenticated,authorizedRoles} =require("../middleware/auth");
const { newOrder, myOrders, getSingleOrder, getAllOrders, DeleteOrder,UpdateOrder } = require("../controllers/OrderController");
router.route("/order/new").post(IsAuthenticated,newOrder)
router.route("/myOrders").get(IsAuthenticated,myOrders)
router.route("/order/:id").get(IsAuthenticated,authorizedRoles("admin"),getSingleOrder)
router.route("/admin/orders").get(IsAuthenticated,authorizedRoles("admin"),getAllOrders)
router.route("/admin/order/:id").put(IsAuthenticated,authorizedRoles("admin"),UpdateOrder).delete(IsAuthenticated,authorizedRoles("admin"),DeleteOrder)


module.exports=router;