import express from 'express'
import multer from 'multer'
import {  getDocumentById, createDocument,   getPdf, getDocumentContent, updateWholeDocumentContent,
getUserDocuments,
renameDocument,
deleteDocument,
getTexFile} from './controllers/documentController';
import { login, verifySessionEndPoint, logout, verifyPassword } from './auth/auth';
import { createFigure, getUserFigureById,getUserFigureFileById, getUserFigures, renameFigure, deleteFigure } from './controllers/figureController';
import { createUser, getUserData, editUserDetails, changePasswordDetails, deleteAccount
 } from './controllers/userController';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default (): express.Router =>{

    try{
        router.get('/document/user/:documentClass',getUserDocuments);
        router.get('/document/:id',getDocumentById);
        router.get('/document/getPdf/:id', getPdf)
        router.get('/document/getTex/:id', getTexFile)
        router.get('/document/getDocumentContent/:id', getDocumentContent)
        router.post('/document',createDocument);
        router.put("/document/documentContent/:id",updateWholeDocumentContent )
        router.put("/document/:id",renameDocument )
        router.delete("/document/:id",deleteDocument )

        router.get('/figure/user/:fileType', getUserFigures)
        router.get('/figure/user/getFigureFile/:id', getUserFigureFileById)
        router.get('/figure/user/getFigure/:id', getUserFigureById)
        router.post('/figure',upload.single('image'), createFigure)
        router.put('/figure/user/renameFigure/:id', renameFigure)
        router.delete('/figure/user/deleteFigure/:id', deleteFigure)

        router.get('/user/', getUserData)
        router.post('/user/createNewAccount', createUser)
        router.put('/user/editUserDetails',editUserDetails)
        router.put('/user/changePassword', changePasswordDetails)
        router.delete('/user/deleteAccount', deleteAccount)

        router.post('/auth/login',login);
        router.get('/auth/verifySession',verifySessionEndPoint);
        router.delete('/auth/logout',logout);
        router.put('/auth/verifyPassword',verifyPassword);
    }catch(error){
        console.error('Router error:',error);
    }

    return router;
}