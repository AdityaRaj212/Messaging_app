import { MessageModel } from "./message.schema.js";

export default class MessageRepository{
    async createDirectMessage(senderId, receiverId, messageText){
        try{
            const newMessage = new MessageModel({
                senderId,
                receiverId,
                messageText,
                messageType: 'direct',
                createdAt: Date.now()
            });
            await newMessage.save();
            return newMessage;
        }catch(err){
            console.error('Error while posting message: ', err);
            throw new Error(`Error in posting msg: ${err}`);
        }
    }

    async createGroupMessage(senderId, groupId, content){
        try{
            const newMessage = new MessageModel({
                senderId,
                groupId,
                messageText: content,
                createdAt: Date.now
            });
            await newMessage.save();
            return newMessage;
        }catch(err){
            console.error('Error while posting group message: ', err);
            throw new Error(err);
        }
    }

    async getMessagesByGroup(groupId){
        try{
            const messages = await MessageModel.find({groupId});
            return messages;
        }catch(err){
            console.error('Error while fetching messages: ', err);
            throw new Error(`Error in fetching msgs: ${err}`);
        }
    }

    async getMessagesForMe(senderId, receiverId, groupId){
        try{
            let dmsForMe = [];
            let grpMsgsForMe = [];
            let msgsByMe = [];

            if(receiverId){
                dmsForMe = await MessageModel.find({receiverId});
            }
            if(groupId){
                grpMsgsForMe = await MessageModel.find({groupId});
            }
            msgsByMe = await MessageModel.find({senderId});
            
            const allMessages = [...dmsForMe, ...grpMsgsForMe, ...msgsByMe];
            const uniqueMessages = Array.from(
                new Set(allMessages.map(msg => msg._id.toString()))
            ).map(id => allMessages.find(msg => msg._id.toString() === id));

            return uniqueMessages;
        }catch(err){
            console.error('Error while fetching individual messages: ', err);
            throw new Error(`Error while fetching dms - ${err}`);
        }
    }

    async updateMessage(messageId, updatedData){
        try{
            const updatedMessage = await MessageModel.findByIdAndUpdate(
                messageId,
                {$set: updatedData},
                {
                    new: true,
                    runValidators: true
                }
            );

            if(!updatedMessage){
                return null;
            }

            return updatedMessage;
        }catch(err){
            console.error('Error while updating message: ', err);
            throw new Error(err);
        }
    }

    async deleteMessage(messageId){
        try{
            const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
            if(!deletedMessage){
                return null;
            }
            return deletedMessage;
        }catch(err){
            console.error('Error while deleting message: ', err);
            throw new Error(err);
        }
    }

    async getChatBetweenUsers(user1Id, user2Id){
        try{
            const pageSize = 20; // Number of messages per page
            const page = 1; // Example: get the first page of messages

            const directMessages = await MessageModel.find({
                $or: [
                    { senderId: user1Id, receiverId: user2Id },
                    { senderId: user2Id, receiverId: user1Id }
                ],
                messageType: 'direct'
            })
            .sort({ createdAt: 1 }) // Sort by createdAt in descending order (most recent first)
            .skip((page - 1) * pageSize) // Skip messages based on the page number
            .limit(pageSize); // Limit to 20 messages

            return directMessages;

        }catch(err){
            console.error('Error while fetching chat between users: ', err);
            throw new Error(err);
        }
    }
}