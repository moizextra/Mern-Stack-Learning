const ErrorHander=require("../utils/errorhandler")
const User=require("../models/userModels")
const jwt=require("jsonwebtoken")
exports.IsAuthenticated=async(req,res,next)=>{
    try{
        const {token}=req.cookies  // Here When user makes a request his cookie sends at every request
        if(!token){
            return next(new ErrorHander("UnAuthorized Access",401))
        }
        const decodedData=jwt.verify(token,process.env.JWT_SCRECT_KEY);
      req.user=  await User.findById(decodedData.id);
next();
    }catch(error){
        return  next(error)
    }
}
exports.authorizedRoles=(...roles)=>{
return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
return next( new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`))
    }
    next();
}

}
