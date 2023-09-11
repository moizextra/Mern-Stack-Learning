const express = require('express');
const app = express();
const cors = require('cors')
const errorMiddleware=require("./middleware/error")
app.use(cors());
const cookieParser=require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const Product=require("./routes/ProductRoute");
const User=require("./routes/UserRoutes");
const Order=require("./routes/OrderRoutes");
app.use("/api/v1",Product);
app.use("/api/v1",User);
app.use("/api/v1",Order);

app.use(errorMiddleware);
 module.exports=app;

 // unhandled promise rejection
 