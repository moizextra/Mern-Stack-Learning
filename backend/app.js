const express = require('express');
const app = express();
const cors = require('cors')
const errorMiddleware=require("./middleware/error")
const errorcheckMiddleware=require("./middleware/errorcheck")
app.use(cors());
const cookieParser=require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const Product=require("./routes/ProductRoute");
const User=require("./routes/UserRoutes");
app.use("/api/v1",Product);
app.use("/api/v1",User);

app.use(errorMiddleware);
app.use(errorcheckMiddleware);
 module.exports=app;

 // unhandled promise rejection
 