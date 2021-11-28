const jwt = require("jsonwebtoken");
const { v1: uuidv1, v4: uuidv4, } = require('uuid');

// types: 'sp' or 'rt'
exports.GenerateJwt = function GenerateJwt(data, type) {

    if (type === "sp") {
        const token = jwt.sign({
            email: data[0].user_email,
            role: data[0].role_name,
            name: data[0].user_name,
            lastname: data[0].user_last_name
        },
            process.env.APP_SECRET,
            {
                expiresIn: "1h"
            }
        );
        return token;
    }
    else if (type === "rt") {
        const token = jwt.sign({
            email: data.email,
            role: data.role,
            name: data.user,
            lastname: data.lastname
        },
            process.env.APP_SECRET,
            {
                expiresIn: "1h"
            }
        );
        return token;
    }
};

exports.GenerateRefreshToken = function GenerateRefreshToken() {
    return uuidv4();
}