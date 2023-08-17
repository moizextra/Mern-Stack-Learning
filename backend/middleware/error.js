const {ErrorHander}=require("../utils/errorhandler");
module.exports=(err,req,res,next)=>{
err.statuscode=err.statuscode || 500;
err.message=err.message || "Internal Server Error";
res.status(err.statuscode).json({
    success:false,
    error:err
})
}