import { GroupModel } from "./group.schema.js";

export default class GroupRepository{
    async createGroup(groupName, createdBy, memberIds){
        try{
            const newGroup = new GroupModel({
                groupName,
                createdBy,
                memberIds
            });
            await newGroup.save();
            return newGroup;
        }catch(err){
            console.error('Error while creating group: ', err);
            throw new Error(`Failed creating group ${err}`);
        }
    }

    async getGroup(groupId){
        try{
            const group = await GroupModel.findById(groupId);
            return group;
        }catch(err){
            console.error('Error while fetching group: ', err);
            throw new Error(`Failed fetching group ${err}`);
        }
    }

    async updateGroup(groupId, updatedData){
        try{
            const updatedGroup = await GroupModel.findByIdAndUpdate(
                groupId,
                {$set: updatedData},
                {
                    new: true,
                    runValidators: true
                }
            );
            if(!updatedGroup){
                return null;
            }
            return updatedGroup;
        }catch(err){
            console.error('Error while updating group: ', err);
            throw new Error(`Failed updating group ${err}`);
        }
    }

    async deleteGroup(groupId){
        try{
            const deletedGroup = await GroupModel.findByIdAndDelete(groupId);
            if(!deletedGroup){
                return null;
            }
            return deletedGroup;
        }catch(err){
            console.error('Error while deleting group: ', err);
            throw new Error(`Failed deleting group ${err}`);
        }
    }
}