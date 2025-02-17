import express from 'express'
import mongoose from "mongoose";
import { userModel } from '../models/userModel';

const sessionSchema= new mongoose.Schema({
    userId: {type: String, required: true},
    expiresAt: {type: Date, required: true}
})

const sessionModel = mongoose.model('Session', sessionSchema, 'Session');

const expireTime= 1000 * 60 * 60

export const login = async (req: express.Request, res: express.Response)=>{

   

        try {
            //console.log("body:", req.body)
            const {email, password}= req.body
            //console.log("email:", email)
             const [user] = await userModel.find({email: email});
            //console.log(user)
             if(user===null || user===undefined){
                res.status(404).send({error: 'User not found!'});
             }else{
             if(user.password=== password){
                //to do
                const session= new sessionModel({userId: user.id, expiresAt: new Date(Date.now() + expireTime)});
                const savedSession = await session.save();

               // req.session.userId='Warrioll'
               //console.log("sessionId", savedSession.id)
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

            // if(password==='abc1234?' && email==='warrioll@email.com'){
            //     res.cookie('auth', 'Warrioll', {maxAge: 60000})
            //     res.status(201).send({msg: 'Loged in'});
            // }else{
            //     res.status(400).send({msg: 'Not logdes in'});
            // }

            // if(req.cookies.email && req.cookies.email==='abc1234?' ){
            //     res.status(201).send({msg: 'Hello'});
            // }else{
            //     res.status(400).send({msg: 'No cookie!'});
            // }
            
        }

export const verifySessionEndPoint = async (req: express.Request, res: express.Response)=>{        
    try{
        //const {sessionId} = req.params;
       // console.log("sesionId: ", sessionId)
    //     const session = await sessionModel.findById(sessionId)
    //   //  console.log("session: ", session) 
    //     if(session===null){
    //         res.sendStatus(404) 
    //     }else{
    //         const user = await userModel.findById(session.userId)
    //         if(user===null){
    //             res.sendStatus(404)
    //         }else{
    //            // console.log("userId: ", session.userId) 
    //             res.status(200).json({userId: session.userId})
    //         }
           
    //     }
        
       const userId:string = await verifySession(req.cookies.auth);
       if(userId===null || userId=== undefined)
       {
        res.sendStatus(401)
       }else{
        res.status(200).json({userId: userId})
       }

    }catch(error){
        console.log("verifySession error: ", error)
        res.sendStatus(400);
    }
}

//jeśli weryfikacja przebiegła pomyślnie zwraca id użytkownika, jeśli nie to zwraca null
export const verifySession = async (sessionId:string): Promise<string>=>{
    try{
       // console.log("sesionId: ", sessionId)
        if(sessionId===null || sessionId===undefined)
            return null

        const session = await sessionModel.findById(sessionId)
      //  console.log("session: ", session) 
        if(session===null){
            return null
        }else{
            const user = await userModel.findById(session.userId)
            if(user===null){
              return null
            }else{
               // console.log("userId: ", session.userId)

                return session.userId
            }
           
        }
        
    }catch(error){
        console.log("verifySession error: ", error)
       return null
    }
}

// export const verifyAccess =async(sessionId:string):Promise<boolean>=>{
//     try{
//         const userId = await verifySession(sessionId)
//         if(userId===null || userId===undefined)
//             return false
//         if(userId = )


//     }catch(error){
//         console.log("Verification acces failed", error)
//     }
// }

export const extendSession = async (sessionId: string, res: express.Response) =>{

    try{
       
        const userId = (await sessionModel.findById(sessionId)).userId;
        const deletedSession = await sessionModel.findByIdAndDelete(sessionId)
        const newSession= new sessionModel({userId: userId, expiresAt: new Date(Date.now() + expireTime)});
        const savedSession = await newSession.save();

        //console.log("extended sessionID: ",savedSession.id )
        res.cookie('auth',savedSession.id, {maxAge: expireTime, sameSite: 'lax', httpOnly: true
        })
    }catch(error){
        console.log(" extend session failed: ", error)
    }
}

export const logout = async (req: express.Request, res: express.Response)=>{  

    try{
        const deletedSession = await sessionModel.findByIdAndDelete(req.cookies.auth)
        res.clearCookie('auth');
        res.sendStatus(200)
    }catch(error){
        console.log("logout error: ", error)
    }
}