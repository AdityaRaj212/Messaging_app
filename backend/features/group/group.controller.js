import GroupRepository from "./group.repository.js";

export default class GroupController{
    constructor(){
        this.groupRepository = new GroupRepository();
    }

    async createGroup(req, res){
        try{
            const {groupName, createdBy, memberIds} = req.body;
            const newGroup = await this.groupRepository.createGroup(groupName, createdBy, memberIds);
            res.status(201).json({
                status: true,
                group: newGroup
            })
        }catch(err){
            res.status(500).json({
                status: false,
                msg: 'Failed creating group',
                error: err
            })
        }
    }

    async getGroup(req, res){
        try{
            const {groupId} = req.params;
            const group = await this.groupRepository.getGroup(groupId);
            res.status(200).json({
                status: true,
                group
            })
        }catch(err){
            res.status(500).json({
                status: false,
                msg: 'Failed fetching group',
                error: err
            })
        }
    }

    async updateGroup(req, res){
        try{
            const {groupId, updatedData} = req.body;
            const updatedGroup = await this.groupRepository.updateGroup(groupId, updatedData);
            res.status(201).json({
                status: true,
                updatedGroup
            })
        }catch(err){
            res.status(500).json({
                status: false,
                msg: 'Failed updating group',
                error: err
            })
        }
    }

    async deleteGroup(req, res){
        try{
            const {groupId} = req.body;
            const deletedGroup = await this.groupRepository.deleteGroup(groupId);
            res.status(201).json({
                status: true,
                deletedGroup
            })
        }catch(err){
            res.status(500).json({
                status: false,
                msg: 'Failed deleting group',
                error: err
            })
        }
    }
}