const express = require('express');
const authController = require('../controller/auth-controller');
const {signupSchema,loginSchema } =require("../validator/auth_validator");
const validate =require("../middleware/vaildate-middleware")
const authMiddleware =require("../middleware/auth-middleware")

const router = express.Router();
router.route('/').get (authController.home);
router.route('/register').post (validate(signupSchema),authController.register);
router.route('/login').post (validate(loginSchema),authController.login);
router.route('/user').get (authMiddleware,authController.user);
module.exports = router;
