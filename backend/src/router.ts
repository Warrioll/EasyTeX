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
        router.get('/auth',async (req: express.Request, res: express.Response)=>{
            const {email, password}= req.body
           
            if(password==='abc1234?' && email==='warrioll@email.com'){
                res.cookie('auth', 'Warrioll', {maxAge: 60000})
                res.status(201).send({msg: 'Loged in'});
            }else{
                res.status(400).send({msg: 'Not logdes in'});
            }

            // if(req.cookies.email && req.cookies.email==='abc1234?' ){
            //     res.status(201).send({msg: 'Hello'});
            // }else{
            //     res.status(400).send({msg: 'No cookie!'});
            // }
            
        });
    }catch(error){
        console.log(error);
    }

    return router;
}