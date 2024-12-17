import express from 'express'
import { userModel } from '../models/userModel';

export const getUserById = async (req: express.Request, res: express.Response)=>{

    try{
      const {id} = req.params;
      const user = await userModel.findById(id);
      res.status(200).json(user);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
}

export const getUserByEmail = async (req: express.Request, res: express.Response)=>{

    try{
      const {email} = req.params;
      const [user] = await userModel.find({email: email, password: 'abc1234?', userName: 'Warrioll'});
      res.status(200).json(user);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
}

export const  getAllUsers= async (req: express.Request, res: express.Response)=>{
  try{
      const users = await userModel.find();
      res.status(200).json(users);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
};