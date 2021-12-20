const bcrypt = require('bcrypt');
const token_manager = require('../security/tokenManager');
const db = require('../database_access/database_connection');
const message_manager = require('../messages/messageManager');


exports.SignInView = async (req, res) => {
    return res.status(202).json("get signin view method executed");
};

exports.GetResources = (req, res) => {
    return res.status(202).json("get all resources method executed");
};

exports.GetSystems = (req, res) => {
    return res.status(202).json("get all systems method executed");
};

exports.GetRoles = (req, res) => {
    return res.status(202).json("get all roles method executed");
};

exports.SignOut = (req, res) => {
    return res.status(202).json("signout method executed");
};

exports.GetResourceById = (req, res) => {
    return res.status(202).json("get resource by id method executed");
};

exports.GetSystemById = (req, res) => {
    return res.status(202).json("get system by id method executed");
};

exports.GetUserById = (req, res) => {
    return res.status(202).json("get user by id method executed");
};

exports.RegisterAdministrator = async (req, res) => {

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
};

exports.LogInUser = async (req, res) => {

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
};

exports.AddRol = async (req, res) => {

    let rolName = req.body.name;
    let rolDesc = req.body.description;

    rolName = (rolName === undefined || rolName === "") ? null : rolName;
    rolDesc = (rolDesc === undefined || rolDesc === "") ? null : rolDesc;

    await db.proc('add_rol', [rolName, rolDesc, null])
        .then(data => {
            return res.status(201).json({ response: data.response });
        })
        .catch(error => {
            return res.status(500).json(message_manager.UnauthorizedCustomMessage(error));
        })
};

exports.Adduser = async (req, res) => {

    const incomingUser = req.body;

    incomingUser.id_rol = (
        incomingUser.id_rol === "" ||
        incomingUser.id_rol === undefined ||
        incomingUser.id_rol === 0) ? null : incomingUser.id_rol;

    incomingUser.id_system = (
        incomingUser.id_system === "" ||
        incomingUser.id_system === undefined ||
        incomingUser.id_system === 0) ? null : incomingUser.id_system;

    await db.func('validate_user', [incomingUser.email])
        .then(data => {

            if (data.email == null) {

                bcrypt.hash(incomingUser.password, 10)
                    .then(async (hashPassword) => {

                        await db.proc('add_user', [incomingUser.name, incomingUser.last_name, hashPassword, incomingUser.email, incomingUser.id_rol, incomingUser.id_system, null])
                            .then(async data => {

                                if (data.response != "OK") throw new Error();
                                return res.status(201).json({ response: data.response });
                            })
                            .catch(error => {
                                return res.status(401).send(message_manager.UnauthorizedMessage());
                            });
                    })
                    .catch(error => {
                        return res.status(401).send(message_manager.UnauthorizedMessage());
                    });
            } else {
                return res.status(401).send(message_manager.UnauthorizedMessage());
            }
        })
};

exports.AddSystem = async (req, res) => {

    const incomingSystem = req.body;

    if (incomingSystem.name === undefined || incomingSystem.name === "") throw new Error();

    incomingSystem.description = (
        incomingSystem.description === "" ||
        incomingSystem.description === undefined) ? null : incomingSystem.description;

    incomingSystem.initials = (
        incomingSystem.initials === "" ||
        incomingSystem.initials === undefined) ? null : incomingSystem.initials;

    await db.proc('add_system', [incomingSystem.name, incomingSystem.description, incomingSystem.initials])
        .then(data => {

            if (data.response != "OK") throw new Error();
            return res.status(201).json({ response: data.response });
        })
        .catch(error => {
            return res.status(401).send(message_manager.UnauthorizedMessage());
        });
};

exports.AddResource = async (req, res) => {
    return res.status(202).json("add resource method executed");
};

exports.GenerateToken = (req, res) => {

    const access_token = token_manager.GenerateJwt(req.body.decodedUser, "rt");
    return res.status(202).json({ access_token: access_token });
}