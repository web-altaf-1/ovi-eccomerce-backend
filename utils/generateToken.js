
const jwt = require('jsonwebtoken')

exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
        status: userInfo.status,
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '7days'
    })
    return token;

}; 