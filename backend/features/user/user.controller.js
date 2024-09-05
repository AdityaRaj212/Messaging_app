import UserRepository from "./user.repository.js";
import jwt from 'jsonwebtoken';

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req, res){
        try{
            const {name, userName, email, password} = req.body;
            const newUser = await this.userRepository.addUser(name, userName, email, password);
            res.status(201).json({
                status: true,
                user: newUser
            });
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'SignUp failed'
            });
        }
    }

    async signIn(req, res){
        try{
            const {email, password} = req.body;
            const user = await this.userRepository.getUser(email, password);

            if(user){
                // user.lastSeen = Date.now();
                // await user.save();

                const token = jwt.sign(
                    {
                        userId: user._id,
                        email: user.email
                    },
                    'secret',
                    {
                        expiresIn: '24h'
                    }
                );
                
                res.status(200).json({
                    status: true,
                    user,
                    token
                })
            }
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'SignIn failed'
            })
        }
    }

    async getAllUsers(req, res){
        try{
            const users = await this.userRepository.getAllUsers();
            res.status(200).json({
                status: true,
                users
            })
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Fethcing all users failed'
            })
        }
    }

    async getUserById(req, res){
        try{
            const {userId} = req.params;
            const user = await this.userRepository.getUserById(userId);
            res.status(200).json({
                status: true,
                user
            })
        }catch(err){
            res.status(500).json({
                status: false,
                error: err,
                msg: 'Failed to fetch user by id'
            })
        }
    }
}