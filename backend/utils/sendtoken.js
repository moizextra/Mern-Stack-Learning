const sendGeneratedToken=(user,statusCode,res)=>{
    const token=user.sendjwttoken();
    // Now we will send token  via cookie
    const cookieOptions = {
        // Expiration in milliseconds (e.g., 1 hour)
        expires: new Date(Date.now() + 3600000),
        // Limit the cookie to be accessible only through HTTP (default is true)
        httpOnly: true,
    };
    res.status(statusCode).cookie("token",token,cookieOptions).json({
        success:true,
        user,token
    })
    
}
module.exports=sendGeneratedToken;