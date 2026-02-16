import mongoose from "mongoose";
import { InferSchemaType, HydratedDocument } from "mongoose";


const documentSchema= new mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: String, required: true},
    documentClass: {type: String,enum:[ 'article' , 'report' , 'book' , 'letter' , 'beamer'], required: true},
    path:{type: String, required: true},
    creationDate: {type: Date, required:true},
    lastUpdate: {type: Date, require: true}

})

export const documentModel = mongoose.model('Document', documentSchema, 'Document');
export type documentType = HydratedDocument<InferSchemaType<typeof documentSchema>>
