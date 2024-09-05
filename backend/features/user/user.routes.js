import express from 'express';
import UserController from './user.controller.js';

const router = express.Router();

const userController = new UserController();

router.post('/signUp', (req, res)=>{
    userController.signUp(req, res);
});

router.post('/signIn', (req, res)=>{
    userController.signIn(req, res);
});

router.get('/all', (req, res)=>{
    userController.getAllUsers(req, res);
});

router.get('/get-by-id/:userId', (req, res)=>{
    userController.getUserById(req, res);
});

export default router;

