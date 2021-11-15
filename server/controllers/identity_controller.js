const { response, json } = require('express');
const token_manager = require("../security/tokenManager");
const message_manager = require("../messages/messageManager");
const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../database_access/database_connection");

router.get("/signin", async (req, res) => {
    return res.status(202).json("get signin view method executed");
});

router.get("/get_resources", (req, res) => {
    return res.status(202).json("get all resources method executed");
});

router.get("/get_systems", (req, res) => {
    return res.status(202).json("get all systems method executed");
});

router.get("/get_roles", (req, res) => {
    return res.status(202).json("get all roles method executed");
});

router.get("/signout", (req, res) => {
    return res.status(202).json("signout method executed");
});

router.get("/get_resource:id", (req, res) => {
    return res.status(202).json("get resource by id method executed");
});

router.get("/get_system:id", (req, res) => {
    return res.status(202).json("get system by id method executed");
});

router.get("/get_user:id", (req, res) => {
    return res.status(202).json("get user by id method executed");
});
/*--------------------------------------------------------*/
router.post("/signin", async (req, res) => {

    const incomingUser = req.body;

    await db.func('validate_user', [incomingUser.email])
        .then(data => {

            if (data.email == null) {

                bcrypt.hash(incomingUser.password, 10)
                    .then(async (hashPassword) => {

                        await db.proc('add_superuser', [incomingUser.name, incomingUser.last_name, hashPassword, incomingUser.email, incomingUser.secret_code, null])
                            .then(async data => {

                                if (data.response != "OK") throw new Error(data.response);

                                await db.func('get_superuser')
                                    .then(data => {

                                        const jwt_token = token_manager.GenerateJwt(data);

                                        return res.status(201).json({
                                            name: data.user_name,
                                            last_name: data.user_last_name,
                                            access_token: jwt_token
                                        });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return res.send(message_manager.UnauthorizedMessage());
                                    });
                            })
                            .catch(error => {
                                console.log(error);
                                return res.send(message_manager.UnauthorizedMessage());
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.send(message_manager.UnauthorizedMessage());
                    });
            } else {
                return res.send(message_manager.UnauthorizedMessage());
            }
        })
        .catch(error => {
            console.log(error);
            return res.send(message_manager.UnauthorizedMessage());
        });
});

router.post("/login", async (req, res) => {
    return res.status(202).json("this method will send back a token and will open a session");
});

router.post("/add_user", async (req, res) => {
    return res.status(202).json("get resource by id method executed");
});

router.post("/add_system", async (req, res) => {
    return res.status(202).json("add system method executed");
});

router.post("/add_resource", async (req, res) => {
    return res.status(202).json("add resource method executed");
});

router.post("/generate_token", (req, res) => {
    return res.status(202).json("new token generated");
});

module.exports = router;