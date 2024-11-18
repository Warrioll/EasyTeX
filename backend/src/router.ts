import express from 'express'
import { getDocuments, getDocumentById, createDocument,  addLine, getPdf, getDocumentContent, updateWholeDocument, // updateLines, updateLine,

} from './controllers/documentController';
//import documents from './documentRouter'

const router = express.Router();

export default (): express.Router =>{
    //documents(router);

    try{
        router.get('/document',getDocuments);
        router.get('/document/:id',getDocumentById);
        router.get('/document/getPdf/:id', getPdf)
        router.get('/document/getDocumentContent/:id', getDocumentContent)
        router.post('/document',createDocument);
        router.post("/document/line/:id",addLine )
        //router.put("/document/line/:id",updateLine )
       // router.put("/document/lines/:id",updateLines )
        router.put("/document/documentContent/:id",updateWholeDocument )
    }catch(error){
        console.log(error);
    }

    return router;
}