const express = require('express');

const router = express.Router();
const {
    getMessages,
    createMessage,
    deleteMessage
}= require('../contollers/messageControllers');

//get all messages
router.get('/', getMessages);

//post a message
router.post('/', createMessage);    
//delete a message
router.delete('/', deleteMessage);

module.exports = router;