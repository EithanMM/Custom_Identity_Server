require("dotenv").config();
const pgp = require('pg-promise')({});

const database_credentials = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DATABASE
};

const db = pgp(database_credentials);

module.exports = db;