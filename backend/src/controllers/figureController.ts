import express from 'express'
import {figureModel} from '../models/figureModel';
import { verifySession, extendSession } from '../auth/auth';
import fileHandler from 'fs'
import path from 'path';
import { saveFileWithContent, deleteFile  } from '../handlers/fileHandlers';



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
  res.status(200).json(figure)

}else{
   res.sendStatus(401)
}
}catch(e){
  console.log('getUserFigureById error: ', e)
   res.sendStatus(500)
}
}


export const getUserFigureFileById= async (req: express.Request, res: express.Response)=>{
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
  console.log('getUserFigureFileById error: ', e)
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

          const path:string = ['figureBase', userId].join('/')

        const figureData= {name: originalFileNameSplitted.join('.'), 
                    userId: userId,
                   fileType: extension,
                   path: path,
                    creationDate: new Date(Date.now()),
                   lastUpdate: new Date(Date.now()),
        }

        const figure= new figureModel(figureData);
        const savedFigure = await figure.save();
        await saveFileWithContent(path, savedFigure._id as unknown as string, extension, req.file.buffer)
        //fileHandler.writeFileSync([path, [savedFigure._id, extension].join('.')].join('/'), req.file.buffer)


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

export const renameFigure  = async (req: express.Request, res: express.Response)=>{
  try{
    const {id}=req.params
    const userId = await verifySession(req.cookies.auth)
    const figureNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_.])$/g
   
    const figure = await figureModel.findById(id)
   // console.log('userId',id)
    if(req.cookies.auth && userId && userId===figure.userId){
      

      if(figureNameRegex.test(req.body.name)){
      const updatedDocument = await figureModel.findByIdAndUpdate(id, {name: req.body.name, lastUpdate: new Date(Date.now())})
      await extendSession(req.cookies.auth,res)
      res.sendStatus(200)
      }else{
        res.sendStatus(403)
      }
    
    }else{
      res.sendStatus(401)
    }
  }catch(error){
    console.log('rename figureerror: ', error)
  }
}

export const deleteFigure  = async (req: express.Request, res: express.Response)=>{
  try{
    const {id}=req.params
    const userId = await verifySession(req.cookies.auth)
   
    const figure = await figureModel.findById(id)
   // console.log('userId',id)
    if(req.cookies.auth && userId && userId===figure.userId){
      

      await deleteFile(figure.path,id, figure.fileType) 
      const updatedDocument = await figureModel.findByIdAndDelete(id)
      await extendSession(req.cookies.auth,res)
      res.sendStatus(200)
    
    }else{
      res.sendStatus(401)
    }
  }catch(error){
    console.log('rename document error: ', error)
  }
}
