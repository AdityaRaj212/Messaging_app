import express from 'express';
import MessageController from './message.controller.js';

const messageController = new MessageController();

const router = express.Router();

router.post('/direct', (req, res)=>{
    messageController.createDirectMessage(req, res);
});

router.post('/group', (req, res)=>{
    messageController.createGroupMessage(req, res);
});

router.put('/update', (req, res)=>{
    messageController.updateMessage(req, res);
});

router.get('/group-messages', (req, res)=>{
    messageController.getMessageByGroup(req, res);
});

router.get('/for-me/:receiverId', (req, res)=>{
    messageController.getMessagesForMe(req, res);
});

router.delete('/delete', (req, res)=>{
    messageController.deleteMessage(req, res);
});

router.post('/between-users', (req, res)=>{
    messageController.getChatBetweenUsers(req, res);
})

export default router;