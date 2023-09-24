const sendGeneratedToken = (user, statusCode, res) => {
    const token = user.sendjwttoken();

    // Specify cookie options
    const cookieOptions = {
       
        domain:"localhost",
        path:"/api/v1",
        httpOnly: true, // Limit the cookie to be accessible only through HTTP
        sameSite: 'None', // Allow cross-origin cookies (if applicable)
    };
    res.cookie("token", token,
     {
        expires: new Date(
            Date.now() + 60 * 24 * 60 * 60 * 1000
        ), 
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path:"/"
    }
    
    ) .status(statusCode).json({
            success: true,
            user,
            token
        });
   
    
};

module.exports = sendGeneratedToken;
