import express from 'express'
import { getDocuments, getDocumentById, createDocument,  addLine, getPdf, getDocumentContent, updateWholeDocumentContent, // updateLines, updateLine,
getUserDocuments,
renameDocument} from './controllers/documentController';
import { login, verifySessionEndPoint, logout } from './auth/auth';
import { getUserById, getAllUsers, getUserByEmail, createUser } from './controllers/userController';
//import documents from './documentRouter'

const router = express.Router();

export default (): express.Router =>{
    //documents(router);

    try{
        router.get('/document',getDocuments);
        router.get('/document/user/:userId/:documentClass',getUserDocuments);
        router.get('/document/:id',getDocumentById);
        router.get('/document/getPdf/:id', getPdf)
        router.get('/document/getDocumentContent/:id', getDocumentContent)
        router.post('/document',createDocument);
        router.post("/document/line/:id",addLine )
        //router.put("/document/line/:id",updateLine )
       // router.put("/document/lines/:id",updateLines )
        router.put("/document/documentContent/:id",updateWholeDocumentContent )
        router.put("/document/:id",renameDocument )

        router.get('/user/:id', getUserById)
        router.get('/userByEmail', getUserByEmail)
        router.get('/user', getAllUsers)
        router.post('/user/createNewAccount', createUser)

        router.post('/auth/login',login);
        router.get('/auth/verifySession',verifySessionEndPoint);
        router.delete('/auth/logout',logout);
    }catch(error){
        console.log(error);
    }

    return router;
}