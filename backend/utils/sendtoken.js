const sendGeneratedToken = (user, statusCode, res) => {
    const token = user.sendjwttoken();

    // Specify cookie options
    const cookieOptions = {
        expires: new Date(Date.now() + 3600000), // Expiration in milliseconds (e.g., 1 hour)
        domain:"localhost",
        path:"/api/v1",
        httpOnly: true, // Limit the cookie to be accessible only through HTTP
        sameSite: 'None', // Allow cross-origin cookies (if applicable)
    };
    res.cookie('token', token,cookieOptions);
    res.status(statusCode).json({
        success: true,
        user,
    });
};

module.exports = sendGeneratedToken;
