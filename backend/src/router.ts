import express from 'express'
import { getDocuments, getDocumentById, createDocument, updateLine, addLine } from './controllers/documentController';
//import documents from './documentRouter'

const router = express.Router();

export default (): express.Router =>{
    //documents(router);

    try{
        router.get('/document',getDocuments);
        router.get('/document/:id',getDocumentById);
        router.post('/document',createDocument);
        router.post("/document/line/:id",addLine )
        router.put("/document/line/:id",updateLine )
    }catch(error){
        console.log(error);
    }

    return router;
}