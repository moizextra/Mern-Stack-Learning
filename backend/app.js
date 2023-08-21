const express = require('express');
const app = express();
const errorMiddleware=require("./middleware/error")
const cookieParser=require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const Product=require("./routes/ProductRoute");
const User=require("./routes/UserRoutes");
app.use("/api/v1",Product);
app.use("/api/v1",User);

app.use(errorMiddleware);
 module.exports=app;

 // unhandled promise rejection
 