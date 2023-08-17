const express = require('express');
const app = express();
const errorMiddleware=require("./middleware/error")
app.use(express.json());
app.use(errorMiddleware);

const Product=require("./routes/ProductRoute");
app.use("/api/v1",Product);

 module.exports=app;
