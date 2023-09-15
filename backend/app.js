const express = require('express');
const app = express();
const cors = require('cors')
const bodypraser=require("body-parser")
const fileupload=require("express-fileupload");
const errorMiddleware=require("./middleware/error")
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin:["http://127.0.0.1:5173"],
        credentials:true
    }
));
app.use(bodypraser.urlencoded({extended:true}))
app.use(fileupload());
const Product=require("./routes/ProductRoute");
const User=require("./routes/UserRoutes");
const Order=require("./routes/OrderRoutes");
app.use("/api/v1",Product);
app.use("/api/v1",User);
app.use("/api/v1",Order);

app.use(errorMiddleware);
 module.exports=app;

 // unhandled promise rejection
 