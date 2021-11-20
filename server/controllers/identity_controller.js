const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const token_manager = require('../security/tokenManager');
const db = require('../database_access/database_connection');
const message_manager = require('../messages/messageManager');
const { verifyAccessToken, verifyCredentials } = require('../middleware/auth');


router.get('/', (req, res) => {
    response.status(200).send({ message: 'main-identity-view' });
});

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

                                        const jwt_token = token_manager.GenerateJwt(data, "sp");

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

router.post("/login", verifyCredentials, async (req, res) => {

    await db.func('validate_user', [req.body.email])
        .then(data => {

            bcrypt.compare(req.body.password, data[0].user_password, (err, hash) => {

                if (err) return res.status(401).json(message_manager.UnauthorizedCustomMessage(err.message));

                const jwt_token = token_manager.GenerateJwt(data, "sp");

                return res.status(200).json({
                    name: data[0].user_name,
                    last_name: data[0].user_last_name,
                    access_token: jwt_token
                });
            })
        })
        .catch(error => {
            return res.status(401).json(message_manager.UnauthorizedMessage());
        })
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

router.post("/generate_token", verifyAccessToken, (req, res) => {

    const access_token = token_manager.GenerateJwt(req.body.decodedUser, "rt");
    return res.status(202).json({ access_token: access_token });
});


// const getAllDepartments = () => {
// 	return new Promise((resolve, reject) => {
// 		const url = 'https://backendapi.turing.com/departments';
// 		request({ url, json: true }, (error, { body }) => {
// 			if (error) reject(error);

// 			resolve(body);
// 		});
// 	});
// };

module.exports = router;