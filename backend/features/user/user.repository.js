import { UserModel } from "./user.schema.js";

export default class UserRepository{
    async addUser(name, userName, email, password){
        try{
            const newUser = new UserModel({
                name,
                userName,
                email,
                password
            })
            await newUser.save();
            return newUser;
        }catch(err){
            console.error('Error while creating user account: ', err);
            throw new Error(`Failed to create user: ${err.message}`);
        }
    }

    async updateUser(userId, updatedData){
        try{
           const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {$set: updatedData},
            {
                new: true,
                runValidators: true
            }
           );
           
           if(!updatedUser){
            return null;
           }

           return updatedUser;
        }catch(err){
            console.error('Error while updating name: ', err);
            throw new Error(`Failed to update name: ${err.message}`);
        }
    }

    async getAllUsers(){
        try{
            const users = UserModel.find();
            return users;
        }catch(err){
            console.error('Error while fetching all users: ', err);
            throw new Error(`Failed to fetch all users: ${err}`);
        }
    }

    async getUser(email, password){
        try{
            const user = await UserModel.find({email, password});
            if(!user){
                return null;
            }
            return user;
        }catch(err){
            console.error('Error while fetching user by email and password: ', err);
            throw new Error(`Failed to fetch user by email and password: ${err.message}`);
        }
    }

    async getUserById(userId){
        try{
           const user = await UserModel.findById(userId);
           if(!user){
            return null;
           }
           return user;
        }catch(err){
            console.error('Error while fetching user: ', err);
            throw new Error(`Failed to fetch user: ${err.message}`);
        }
    }

    async deleteUser(userId){
        try{
           const deletedUser = UserModel.findByIdAndDelete(userId);
           if(!deletedUser){
            return null;
           }
           return deletedUser;
        }catch(err){
            console.error('Error while deleting user account: ', err);
            throw new Error(`Failed to delete user account: ${err.message}`);
        }
    }
}