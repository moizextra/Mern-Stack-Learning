const sendGeneratedToken = (user, statusCode, res) => {
    const token = user.sendjwttoken(); // Generate a JWT token for the user (assuming this method exists)

    // Specify cookie options
    const cookieOptions = {
        domain: "localhost",       // Domain where the cookie is accessible
        path: "/api/v1",          // Path within the domain where the cookie is accessible
        httpOnly: true,           // Limit the cookie to be accessible only through HTTP
        sameSite: 'None',         // Allow cross-origin cookies (if applicable)
    };

    res.cookie("token", token,
     {
        expires: new Date(
            Date.now() + 60 * 24 * 60 * 60 * 1000 // Token expiration time (in milliseconds)
        ),
        httpOnly: true,
        secure: true,             // Ensure the cookie is sent only over HTTPS (recommended for production)
        sameSite: "strict",       // Restrict cookie to same-site requests only
        path: "/",                // Path where the cookie is accessible (root path)
    }
    
    ).status(statusCode).json({
        success: true,
        user,
        token
    });
};

module.exports = sendGeneratedToken;
