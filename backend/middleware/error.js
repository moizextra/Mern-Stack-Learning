const ErrorHander = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";


// wroung mongodb id error
if(err.name == "CastError"){
  message=`Resource not found + ${err.path} `;
  err= new ErrorHander(message,400);
}
// if we get mongoose duplicate key error
if(err.code ==11000){
  const message= "Duplicate Email"
  err= new ErrorHander(message,400);
}
  res.status(err.statusCode ).json({
    success: false,
    message:err.message
  });

};