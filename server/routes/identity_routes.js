const express = require('express');
const router = express.Router();
const IdentityController = require('../controllers/identity_controller');
const { verifyAccessToken, verifyCredentials } = require('../middleware/auth');

router.get('/', (req, res) => {
    return res.status(200).json({ response: "Root endpoint" });
});

router.get("/signin", IdentityController.SignInView);

router.get("/get_resources", IdentityController.GetResources);

router.get("/get_systems", IdentityController.GetSystems);

router.get("/get_roles", IdentityController.GetRoles);

router.get("/signout", IdentityController.SignOut);

router.get("/get_resource:id", IdentityController.GetResourceById);

router.get("/get_system:id", IdentityController.GetSystemById);

router.get("/get_user:id", IdentityController.GetUserById);



router.post("/signin", IdentityController.RegisterAdministrator);

router.post("/login", verifyCredentials, IdentityController.LogInUser);

router.post('/add_rol', verifyAccessToken, IdentityController.AddRol);

router.post("/add_user", verifyAccessToken, IdentityController.Adduser);

router.post("/add_system", verifyAccessToken, IdentityController.AddSystem);

router.post("/add_resource", verifyAccessToken, IdentityController.AddResource);

router.post("/generate_token", verifyAccessToken, IdentityController.GenerateToken);



module.exports = router;