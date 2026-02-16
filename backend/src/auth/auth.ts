import express from 'express'
import mongoose from "mongoose";
import { userModel } from '../models/userModel';

const sessionSchema= new mongoose.Schema({
    userId: {type: String, required: true},
    expiresAt: {type: Date, required: true},
    lastUpdate: {type: Date, required: true},
    previousSession: {type: String, required: false},
    previousAcceptableUnill: {type: Date, required: false},
    
})

const sessionModel = mongoose.model('Session', sessionSchema, 'Session');

const expireTime= 1000 * 60 * 60 * 12
const previousAcceptableTime = 1000 * 60 * 3
const extendTime = 1000 * 60 * 10

export const login = async (req: express.Request, res: express.Response)=>{

   

        try {
           
            const {email, password}= req.body
            
             const [user] = await userModel.find({email: email});
           
             if(user===null || user===undefined){
                res.status(404).send({error: 'User not found!'});
             }else{
             if(user.password=== password){
               
                const session= new sessionModel({userId: user.id, expiresAt: new Date(Date.now() + expireTime), lastUpdate: new Date(Date.now() //+ expireTime
                )});
                const deletedSessions = await sessionModel.deleteMany({userId: user.id})
            
                const savedSession = await session.save();


                res.cookie('auth', savedSession.id, {maxAge: expireTime, sameSite: 'lax', httpOnly: true
                     })
                res.status(201).send({msg: 'Loged in'});
                
            }else{
                res.status(403).send({msg: 'Not logded in'});
            }
        }

    }catch(error){
        console.log("error", error)
    }            
        }

export const verifySessionEndPoint = async (req: express.Request, res: express.Response)=>{        
    try{
        
        const userId:string = await verifySession(req.cookies.auth, res);
        
        res.status(200).json({userId: userId})

    }catch(error){
        console.log("verifySession error: ", error)
        if(!res.headersSent){
            res.sendStatus(500);
        }
    }
}


export const verifySession = async (sessionId:string, res: express.Response): Promise<string | null>=>{
    try{
        if(sessionId===null || sessionId===undefined){
            res.sendStatus(401)
        }else{
            let session = await sessionModel.findById(sessionId)
            if(session===null || session===undefined){
                session = await sessionModel.findOne({previousSession: sessionId})
                if(session!==null && session!==undefined && session.previousAcceptableUnill.getTime()< Date.now()){
                    session=null
                }
            }
            if(session===null || session===undefined){
                res.sendStatus(401)
            }else{
                const user = await userModel.findById(session.userId)
                if(user===null || user===undefined){
                    res.sendStatus(401)
                }else{
                    return session.userId
                }
            }
        }
        return null        
    }catch(error){
         if(!res.headersSent){
        res.sendStatus(401)}
        return null
    }
}

export const verifySessionWithCallback = async (sessionId:string, res: express.Response, callback: (userId:string)=>Promise<void>): Promise<void>=>{
    try{
        if(sessionId===null || sessionId===undefined){
            res.sendStatus(401)
        }else{
            let session = await sessionModel.findById(sessionId)
            if(session===null || session===undefined){
                session = await sessionModel.findOne({previousSession: sessionId})
                if(session!==null && session!==undefined && session.previousAcceptableUnill.getTime()< Date.now()){
                    session=null
                }
            }
            if(session===null || session===undefined){
                res.sendStatus(401)
            }else{
                const user = await userModel.findById(session.userId)
                if(user===null || user===undefined){
                    res.sendStatus(401)
                }else{
                    await callback(session.userId)
                }
            }
        }
    }catch(error){
        console.log('Session verification error: ', error)
        if(!res.headersSent){
            res.sendStatus(500)
        }
    }
}

export const extendSession = async (sessionId: string, res: express.Response) =>{

    try{
       const session =await sessionModel.findById(sessionId)
       if(Date.now()>session.lastUpdate.getTime()+extendTime){
        const userId = session.userId;
        const deletedSession = await sessionModel.findByIdAndDelete(sessionId)
        const newSession= new sessionModel({userId: userId, expiresAt: new Date(Date.now() + expireTime), lastUpdate: new Date(Date.now()), previousSession: deletedSession._id , previousAcceptableUnill: new Date(Date.now() + previousAcceptableTime)});
        const savedSession = await newSession.save();

        res.cookie('auth',savedSession.id, {maxAge: expireTime, sameSite: 'lax', httpOnly: true
        })
       }


    }catch(error){
        console.log(" extend session failed: ", error)
    }
}

export const logout = async (req: express.Request, res: express.Response)=>{  

    try{
        await deleteSession(req.cookies.auth)
        res.clearCookie('auth');
        res.sendStatus(200)
    }catch(error){
        console.log("logout error: ", error)
    }
}

export const deleteSession = async (sessionId: string):Promise<void>=>{ 
    const deletedSession = await sessionModel.findByIdAndDelete(sessionId)
}

export const verifyPassword = async (req: express.Request, res: express.Response)=>{  

    try{
      if(req.cookies.auth===null || req.cookies.auth===undefined){
         res.sendStatus(401);
      }
      const userId = await verifySession(req.cookies.auth, res);
      const user = await userModel.findById(userId);
      
      if(userId!==null && userId!==undefined && user.password===req.body.password){
        res.sendStatus(200)
      }else{
         res.sendStatus(403)
      }
    }catch(error){
        console.log("Verify password error: ", error)
        res.sendStatus(500)
    }
}