const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/signup', userController.signUpNewUser);
router.post('/signin', userController.signInExistingUser);
router.get("/me", verifyToken, userController.getMe);
module.exports = router;