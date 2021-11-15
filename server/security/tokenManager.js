const jwt = require("jsonwebtoken");
const { v1: uuidv1, v4: uuidv4, } = require('uuid');

exports.GenerateJwt = function GenerateJwt(data) {
    const token = jwt.sign({
        email: data.user_email,
        role: data.role_name,
        name: data.user_name,
        lastname: data.user_last_name
    },
        process.env.APP_SECRET,
        {
            expiresIn: "1h"
        }
    );
    return token;
};

exports.GenerateRefreshToken = function GenerateRefreshToken() {
    return uuidv4();
}