import express from 'express'
import {figureModel} from '../models/figureModel';
import { verifySession, extendSession, verifySessionWithCallback } from '../auth/auth';
import fileHandler from 'fs'
import path from 'path';
import { saveFileWithContent, deleteFile  } from '../handlers/fileHandlers';
import { figureType } from '../models/figureModel';
import { nameRegex } from '../nameRegexes';



const verifyAccesToFigure= async (sessionId:string, figureId:string, res: express.Response, callback: (userId:string, figureInstantion: figureType)=>Promise<void>): Promise<void>=>{
  await verifySessionWithCallback(sessionId, res, async (userId: string)=>{
    try{
        if(figureId===null || figureId===undefined){
          res.sendStatus(400);
        }else{
          const figureInstantion = await figureModel.findById(figureId)
          if (figureInstantion===null || figureInstantion===undefined){
          res.sendStatus(404)
          }else{
            if(figureInstantion.userId!==userId){
              res.sendStatus(403)
            }else{
              await callback(userId, figureInstantion)
            }
          }
        }
    }catch(error){
      console.log('Figure acces verification error:', error)
              if(!res.headersSent){
            res.sendStatus(500)
        }
    }
    })
  
}

export const getUserFigures= async (req: express.Request, res: express.Response)=>{

  await verifySessionWithCallback(req.cookies.auth, res, async (userId: string)=>{
    try{
      const { fileType} = req.params;
       
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
       await extendSession(req.cookies.auth,res)
       res.status(200).json(userFigures)
   }catch(error){
     console.log("getUserFigures error: ", error)
     res.sendStatus(500)
   }
  })

}

export const getUserFigureById= async (req: express.Request, res: express.Response)=>{
  const {id} = req.params;
  verifyAccesToFigure(req.cookies.auth, id, res, async(userId:string, figureInstantion: figureType)=>{
    try{
        res.status(200).json(figureInstantion)
    }catch(e){
      console.log('getUserFigureById error: ', e) 
      res.sendStatus(500)
}
  })

}


export const getUserFigureFileById= async (req: express.Request, res: express.Response)=>{

  const {id} = req.params;
    verifyAccesToFigure(req.cookies.auth, id, res, async(userId:string, figureInstantion: figureType)=>{
      try{  
        res.sendFile(['.', figureInstantion.path, [figureInstantion._id, figureInstantion.fileType].join('.')].join('/'), {root: path.join(__dirname, '../../')}, error=>{if(error){res.sendStatus(404)}})
      }catch(e){
        console.log('getUserFigureFileById error: ', e)
        res.sendStatus(500)
      }
    })
}

export const createFigure  = async (req: express.Request, res: express.Response)=>{

  await verifySessionWithCallback(req.cookies.auth, res, async (userId: string)=>{
try{
     
       

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
    
    }catch(error){
        console.log("createFigure error: ", error) 
        res.sendStatus(500);
    }
  })
}

export const renameFigure  = async (req: express.Request, res: express.Response)=>{

    const {id} = req.params;
    verifyAccesToFigure(req.cookies.auth, id, res, async(userId:string, figureInstantion: figureType)=>{

  try{
      if(nameRegex.test(req.body.name)){
        const updatedDocument = await figureModel.findByIdAndUpdate(figureInstantion._id, {name: req.body.name, lastUpdate: new Date(Date.now())})
        await extendSession(req.cookies.auth,res)
        res.sendStatus(200)
      }else{
        res.sendStatus(422)
      }
  }catch(error){
    console.log('rename figureerror: ', error)
  }
})
}

export const deleteFigure  = async (req: express.Request, res: express.Response)=>{

    const {id} = req.params;
    verifyAccesToFigure(req.cookies.auth, id, res, async(userId:string, figureInstantion: figureType)=>{

  try{
      

      await deleteFile(figureInstantion.path,id, figureInstantion.fileType) 
      const updatedDocument = await figureModel.findByIdAndDelete(figureInstantion._id)
      await extendSession(req.cookies.auth,res)
      res.sendStatus(200)
  }catch(error){
    console.log('rename document error: ', error)
  }
})
}
