import express from 'express'
import {figureModel} from '../models/figureModel';
import { verifySession, extendSession } from '../auth/auth';
import fileHandler from 'fs'
import path from 'path';



export const getUserFigures= async (req: express.Request, res: express.Response)=>{
 try{
     const { fileType} = req.params;
    const userId=await verifySession(req.cookies.auth)
 
     if(req.cookies.auth && userId ){
       
       let  userFigures;
       switch (fileType){
         case 'all':
         userFigures = await figureModel.find({userId: userId})
         break;
         case 'png':
         userFigures = await figureModel.find({userId: userId, fileType: 'png'})
         break;
         case 'jpg':
         userFigures = await figureModel.find({userId: userId, fileType: 'jpg'})
         break;
         case 'jpeg':
         userFigures = await figureModel.find({userId: userId, fileType: 'jpeg'})
         break;
         default:
         res.sendStatus(400)
         return;
        
       }
       //const userDocuments = await documentModel.find({userId: userId})
       await extendSession(req.cookies.auth,res)
       res.status(200).json(userFigures)
     }else{
       res.sendStatus(401)
     }
   }catch(error){
     console.log("getUserFigures error: ", error)
     res.sendStatus(500)
   }


}


export const getUserFigureById= async (req: express.Request, res: express.Response)=>{
try{
  const {id} = req.params;
  const userId=await verifySession(req.cookies.auth)
  const figure = await figureModel.findById(id);
  
if(req.cookies.auth && userId===figure.userId  ){
  res.sendFile(['.', figure.path, [figure._id, figure.fileType].join('.')].join('/'), {root: path.join(__dirname, '../../')}, error=>{if(error){res.sendStatus(404)}})

}else{
   res.sendStatus(401)
}
}catch(e){
  console.log('getUserFigureById error: ', e)
   res.sendStatus(500)
}
}

export const createFigure  = async (req: express.Request, res: express.Response)=>{
try{
      const userId = await verifySession(req.cookies.auth)
    
  console.log('cookie auth:', req.cookies.auth)
  console.log('userId: ', userId)
      if(req.cookies.auth &&  userId){
       

        if(req.file.mimetype==='image/png' || req.file.mimetype==='image/jpg' ||req.file.mimetype==='image/jpeg'){

          let originalFileNameSplitted=req.file.originalname.split('.')
          const extension=originalFileNameSplitted[originalFileNameSplitted.length-1].toLowerCase()
          originalFileNameSplitted.splice(originalFileNameSplitted.length-1,1)


        const figureData= {name: originalFileNameSplitted.join('.'), 
                    userId: userId,
                   fileType: extension,
                   path: 'figureBase',
                    creationDate: new Date(Date.now()),
                   //lastUpdate: new Date(Date.now()),
        }

        const figure= new figureModel(figureData);
        const savedFigure = await figure.save();
        fileHandler.writeFileSync('./figureBase/'+savedFigure._id+'.'+extension, req.file.buffer)


        await extendSession(req.cookies.auth,res)
        res.status(201).json(savedFigure);
      }
      else{
        res.sendStatus(403)
      }
    }
        else{
          res.sendStatus(401)
        }
    }catch(error){
        console.log("Post ERROR: ", error) 
        res.sendStatus(500);
    }
}
