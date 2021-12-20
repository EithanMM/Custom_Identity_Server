const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database_access/database_connection");
const message_manager = require("../messages/messageManager");


exports.verifyAccessToken = (req, res, next) => {

    let access_token = req.headers.authorization;

    if (access_token === undefined) return res.status(401).json(message_manager.UnauthorizedMessage());

    access_token = access_token.split(" ")[1];

    jwt.verify(access_token, process.env.APP_SECRET, { ignoreExpiration: false }, (err, decoded) => {

        if (err) return res.status(401).json(message_manager.UnauthorizedCustomMessage(err.message));
        req.body.decodedUser = decoded;
        console.log(req.decodedUser);

        next();
    });
}

exports.verifyCredentials = (req, res, next) => {

    const userLogin = req.body;

    if (userLogin.email === null || undefined || "") {
        return res.status(404).json({ response: 'please provide a valid email.' });
    }

    else if (userLogin.password === null || undefined || "") {
        return res.status(404).json({ response: 'please provide a valid password.' });
    }
    next();
};
