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


export const createUser =async (req: express.Request, res: express.Response)=>{
  try{

    const data = req.body
    console.log(req.body)
    const emailLenghtRegex=/.{5,320}/g
    const userNameLenghtRegex=/.{3,30}/g
    const passwordLenghtRegex=/.{8,64}/g
    if(emailLenghtRegex.test(data.email) && userNameLenghtRegex.test(data.userName) &&passwordLenghtRegex.test(data.password)){
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})$/g
      const userNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!@#$%^&*?\-]+(?<![_.])$/g
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
      if(emailRegex.test(data.email) && userNameRegex.test(data.userName) && passwordRegex.test(data.password)){
  
        const checkEmail = await userModel.findOne({email: data.email})
        const checkUserName = await userModel.findOne({email: data.userName})
        console.log(checkEmail)
        //walidacja regexem emaila i username (długość) ale może w innym if
        if((checkEmail===null || checkEmail===undefined) && (checkUserName===null || checkUserName===undefined)){
          const newUser = new userModel(data)
          const savedUser = await newUser.save();
          res.status(201).json(savedUser)
        }else{
          res.sendStatus(409)
        }
      }else{
        res.sendStatus(406)
      }
    }else{
      res.sendStatus(411)
    }

  }catch(error){
    console.log("creating user error: ", error)
  }
}