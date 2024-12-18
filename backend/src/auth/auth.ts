import express from 'express'
import { userModel } from '../models/userModel';

export const login = async (req: express.Request, res: express.Response)=>{

            const {email, password}= req.body
            console.log("email:", email)
             const [user] = await userModel.find({email: email});
            console.log(user)
             if(user===null || user===undefined){
                res.status(404).send({error: 'User not found!'});
             }else{
             if(user.password=== password){
                //to do
                req.session.userId='Warrioll'
                //res.cookie('auth', 'Warrioll', {maxAge: 600000, sameSite: 'strict'})
                res.status(201).send({msg: 'Loged in'});
            }else{
                res.status(403).send({msg: 'Not logdes in'});
            }
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