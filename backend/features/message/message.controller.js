import { getIO } from "../../config/socket.js";
import MessageRepository from "./message.repository.js";

export default class MessageController{
    constructor(){
        this.messageRepository = new MessageRepository();
    }

    async createDirectMessage(req, res){
        try{
            const {senderId, receiverId, messageText} = req.body;
            const newMessage = await this.messageRepository.createDirectMessage(senderId, receiverId, messageText);
    
            const io = getIO();
            io.to(receiverId).emit('newMessage', newMessage);  // Emit to the receiver's room in real-time
    
            res.status(201).json({
                status: true,
                message: newMessage
            });
        } catch(err) {
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Direct message failed'
            });
        }
    }    

    async createGroupMessage(req, res){
        try{
            const {senderId, groupId, messageText} = req.body;
            const newMessage = await this.messageRepository.createDirectMessage(senderId, groupId, messageText);
            res.status(201).json({
                status: true,
                message: newMessage
            });
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Group message failed'
            })
        }
    }

    async getMessageByGroup(req, res){
        try{
            const {groupId} = req.body;
            const messages = await this.messageRepository.getMessagesByGroup(groupId);
            res.status(200).json({
                status: true,
                messages
            })
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Failed fetching messages'
            })
        }
    }

    async getMessagesForMe(req, res){
        try{
            const {receiverId} = req.params;
            const messages = await this.messageRepository.getMessagesForMe(receiverId);
            res.status(200).json({
                status: true,
                messages
            })
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Failed fetching dms'
            })
        }
    }

    async updateMessage(req, res){
        try{
            const {messageId, updatedData} = req.body;
            const updatedMessage = await this.messageRepository.updateMessage(messageId, updatedData);
            res.status(201).json({
                status: true,
                updatedMessage
            })
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Failed while updating message'
            })
        }
    }

    async deleteMessage(req, res){
        try{
            const {messageId} = req.body;
            const deletedMessage = await this.messageRepository.deleteMessage(messageId);
            res.status(201).json({
                status: true,
                deletedMessage
            })
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Failed while deleting message'
            })
        }
    }

    async getChatBetweenUsers(req, res){
        try{
            const {user1Id, user2Id} = req.body;
            const messages = await this.messageRepository.getChatBetweenUsers(user1Id, user2Id);
            res.status(200).json({
                status: true,
                messages
            })
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Failed while fetching chat between users'
            })
        }
    }
}