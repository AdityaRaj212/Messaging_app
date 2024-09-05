import express from 'express';
import GroupController from './group.controller.js';

const groupController = new GroupController();

const router = express.Router();

router.post('/create', (req, res)=>{
    groupController.createGroup(req, res);
});
    
router.get('/get/:groupId', (req, res)=>{
    groupController.getGroup(req, res);
});

router.put('/update', (req, res)=>{
    groupController.updateGroup(req, res);
});

router.delete('/delete', (req, res)=>{
    groupController.deleteGroup(req, res);
});

export default router;