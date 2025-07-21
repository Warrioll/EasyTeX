import express from 'express'
import multer from 'multer'
import { getDocuments, getDocumentById, createDocument,  addLine, getPdf, getDocumentContent, updateWholeDocumentContent, // updateLines, updateLine,
getUserDocuments,
renameDocument,
deleteDocument,
getTexFile} from './controllers/documentController';
import { login, verifySessionEndPoint, logout, verifyPassword } from './auth/auth';
import { createFigure, getUserFigureById,getUserFigureFileById, getUserFigures, renameFigure, deleteFigure } from './controllers/figureController';
import { getAllUsers, getUserByEmail, createUser, getUserData, editUserDetails, changePasswordDetails, deleteAccount// getUserById,
 } from './controllers/userController';
//import documents from './documentRouter'

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default (): express.Router =>{
    //documents(router);

    try{
        router.get('/document',getDocuments);
        router.get('/document/user/:documentClass',getUserDocuments);
        router.get('/document/:id',getDocumentById);
        router.get('/document/getPdf/:id', getPdf)
        router.get('/document/getTex/:id', getTexFile)
        router.get('/document/getDocumentContent/:id', getDocumentContent)
        router.post('/document',createDocument);
        router.post("/document/line/:id",addLine )
        //router.put("/document/line/:id",updateLine )
       // router.put("/document/lines/:id",updateLines )
        router.put("/document/documentContent/:id",updateWholeDocumentContent )
        router.put("/document/:id",renameDocument )
        router.delete("/document/:id",deleteDocument )

        router.get('/figure/user/:fileType', getUserFigures)
        router.get('/figure/user/getFigureFile/:id', getUserFigureFileById)
        router.get('/figure/user/getFigure/:id', getUserFigureById)
        router.post('/figure',upload.single('image'), createFigure)
        router.put('/figure/user/renameFigure/:id', renameFigure)
        router.delete('/figure/user/deleteFigure/:id', deleteFigure)

        //router.get('/user/:id', getUserById)
        router.get('/user/', getUserData)
        router.get('/userByEmail', getUserByEmail)
        //router.get('/user', getAllUsers)
        router.post('/user/createNewAccount', createUser)
        router.put('/user/editUserDetails',editUserDetails)
        router.put('/user/changePassword', changePasswordDetails)
        router.delete('/user/deleteAccount', deleteAccount)

        router.post('/auth/login',login);
        router.get('/auth/verifySession',verifySessionEndPoint);
        router.delete('/auth/logout',logout);
        router.put('/auth/verifyPassword',verifyPassword);
    }catch(error){
        console.log(error);
    }

    return router;
}