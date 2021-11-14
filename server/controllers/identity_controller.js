const { response, request } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database_access/database_connection");

router.get("/signin", (request, response) => {
    return response.status(202).json("signin method executed");
});

router.get("/get_resources", (request, response) => {
    return response.status(202).json("get all resources method executed");
});

router.get("/get_systems", (request, response) => {
    return response.status(202).json("get all systems method executed");
});

router.get("/get_roles", (request, response) => {
    return response.status(202).json("get all roles method executed");
});

router.get("/signout", (request, response) => {
    return response.status(202).json("signout method executed");
});

router.get("/get_resource:id", (request, response) => {
    return response.status(202).json("get resource by id method executed");
});

router.get("/get_system:id", (request, response) => {
    return response.status(202).json("get system by id method executed");
});

router.get("/get_user:id", (request, response) => {
    return response.status(202).json("get user by id method executed");
});
/*--------------------------------------------------------*/
router.post("/add_user", (request, response) => {
    return response.status(202).json("get resource by id method executed");

});

router.post("/add_system", (request, response) => {

});

router.post("/add_resource", (request, response) => {

});

module.exports = router;