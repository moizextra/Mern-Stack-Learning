const ErrorHander = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";


// wroung mongodb id error
if(err.name == "CastError"){
  message=`Resource not found + ${err.path} `;
  err= new ErrorHander(message,400);
}
  res.status(err.statusCode).json({
    success: false,
    message: err.stack,
  });
};