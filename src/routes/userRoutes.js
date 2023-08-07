const express = require("express");
const router = express.Router();

const loginUser = require("../controllers/users/loginUser");

//Importamos las funciones controladoras neceasrias.
const newUser = require("../controllers/users/newUser");
const getUserProfile = require("../controllers/users/getUserProfile");

//Crear un usuario.
router.post("/users/register", newUser);

// Login de usuario.
router.post("/users/login", loginUser);

//Obtenemos información del usuario del token
router.get("/users/:userId", getUserProfile);

module.exports = router;
