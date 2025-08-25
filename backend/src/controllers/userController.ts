import express from 'express'
import { userModel } from '../models/userModel';
import { deleteSession, verifySession } from '../auth/auth';
import { figureModel } from '../models/figureModel';
import { documentModel } from '../models/documentModel';
import { userNameRegex, emailRegex, passwordRegex } from '../nameRegexes';
import { createDirectory, deleteDirectory } from '../handlers/fileHandlers';


// export const getUserById = async (req: express.Request, res: express.Response)=>{

//     try{
//       const {id} = req.params;
//       const user = await userModel.findById(id);
//       res.status(200).json(user);
//   }catch(error){
//       console.log("Get ERROR: ", error)
//       res.sendStatus(400);
//   }
// }


export const getUserData = async (req: express.Request, res: express.Response)=>{

    try{
      //const {id} = req.params;
      const userId = await verifySession(req.cookies.auth, res);
      if( userId!==null){
      const user = await userModel.findById(userId);
      const userDocuments = await documentModel.find({userId: userId})
      const userFigures = await figureModel.find({userId: userId})
      const data={
        user: user,
        documents: userDocuments.length,
        figures: userFigures.length
      }
      res.status(200).json(data);
      }else{
        res.sendStatus(403);
      }
     
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(500);
  }
}

export const getUserByEmail = async (req: express.Request, res: express.Response)=>{

    try{
      const {email} = req.params;
      const [user] = await userModel.find({email: email, password: 'abc1234?', userName: 'Warrioll'});
      res.status(200).json(user);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(500);
  }
}

export const  getAllUsers= async (req: express.Request, res: express.Response)=>{
  try{
      const users = await userModel.find();
      res.status(200).json(users);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(500);
  }
};

export const editUserDetails = async (req: express.Request, res: express.Response)=>{
  //console.log('editUserDetails')
  try{
      if(req.cookies.auth===null || req.cookies.auth===undefined){
         res.sendStatus(401);
      }

      const userId = await verifySession(req.cookies.auth,res);
      if( userId!==null){
      const user = await userModel.findById(userId);
      //console.log(user)
        if (userNameRegex.test(req.body.userName) && emailRegex.test(req.body.email)){
          //console.log(userId)
             const updatedUser = await userModel.findByIdAndUpdate(userId, {userName: req.body.userName, email: req.body.email})
              res.status(200).json(updatedUser);
        }else{
          
          res.sendStatus(400);
        }

      }else{
        res.sendStatus(403);
      }
  }catch(e){
 res.sendStatus(500);
  }
}

export const changePasswordDetails = async (req: express.Request, res: express.Response)=>{
  try{
      if(req.cookies.auth===null || req.cookies.auth===undefined){
         res.sendStatus(401);
      }

      const userId = await verifySession(req.cookies.auth,res);
      //const user = await userModel.findById(userId);
       
      if( userId!==null){
      const user = await userModel.findById(userId);
      console.log(req.body.password)
        if (passwordRegex.test(req.body.password)){
          console.log('ok')
             const updatedUser = await userModel.findByIdAndUpdate(userId, {password: req.body.password})
            
              res.status(200).json(updatedUser);
        }else{
          res.sendStatus(400);
        }

      }else{
        res.sendStatus(403);
      }
  }catch(e){
 res.sendStatus(500);
  }
}

export const deleteAccount = async (req: express.Request, res: express.Response)=>{
  try{
     if(req.cookies.auth===null || req.cookies.auth===undefined){
         res.sendStatus(401);
      }

      const userId = await verifySession(req.cookies.auth,res);
       const user = await userModel.findById(userId);
        if( userId!==null && userId!==undefined && user!==null && user!==undefined){
         
            await deleteDirectory('figureBase/'+userId);
            await figureModel.deleteMany({userId: userId})
            await deleteDirectory('documentBase/'+userId);    
            await documentModel.deleteMany({userId: userId})
            await deleteSession(req.cookies.auth)
            await userModel.findByIdAndDelete(userId);
            // TODO Delete sessions!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!s
          res.sendStatus(200);
        }else{
        res.sendStatus(403);
      }
  }catch(e){
     res.sendStatus(500);
  }
}


export const createUser =async (req: express.Request, res: express.Response)=>{
  try{

    const data = req.body
    console.log(req.body)
    const emailLenghtRegex=/.{5,320}/g
    const userNameLenghtRegex=/.{3,30}/g
    const passwordLenghtRegex=/.{8,64}/g
    if(emailLenghtRegex.test(data.email) && userNameLenghtRegex.test(data.userName) &&passwordLenghtRegex.test(data.password)){
      // const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})$/g
      // const userNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!@#$%^&*?\-]+(?<![_.])$/g
      // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
      if(emailRegex.test(data.email) && userNameRegex.test(data.userName) && passwordRegex.test(data.password)){
  
        const checkEmail = await userModel.findOne({email: data.email})
        const checkUserName = await userModel.findOne({email: data.userName})
        console.log(checkEmail)
        //walidacja regexem emaila i username (długość) ale może w innym if
        if((checkEmail===null || checkEmail===undefined) && (checkUserName===null || checkUserName===undefined)){
          const newUser = new userModel(data)
          const savedUser = await newUser.save();
          console.log('creating user')
          await createDirectory(['documentBase', savedUser._id as unknown as string].join('/'))
          await createDirectory(['figureBase', savedUser._id as unknown as string].join('/'))
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