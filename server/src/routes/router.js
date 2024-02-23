const express = require('express');

const { UserController, MessageController } = require('../controllers/index.js'); 
const userAuth = require('../middleware/user.auth.js');

const router = express.Router();
const userController = new UserController();
const messageController = new MessageController();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/userData', userAuth, userController.userData);

router.post('/storeMessage', messageController.storeMessage);
router.get('/lastMessageTimestamp', messageController.lastMessageTime);

module.exports = router;

