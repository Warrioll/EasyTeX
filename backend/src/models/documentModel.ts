import mongoose from "mongoose";

const documentSchema= new mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: String, required: true},
    //fileName: {type: String, required: true},
    documentClass: {type: String, required: true},
    //path:{type: String, required: true},
    
    //zmienic na true wymaganie
    creationDate: {type: Date, required:true},
    lastUpdate: {type: Date, require: true}

})

export const documentModel = mongoose.model('Document', documentSchema, 'Document');

//export const getDocuments = () => documentModel.find();
//export const createDocument = (values: Record<string, any>) => new documentModel(values).save().then((document)=>document.toObject());
