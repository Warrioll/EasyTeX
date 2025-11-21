import mongoose from "mongoose";
import { InferSchemaType, HydratedDocument } from "mongoose";

const figureSchema= new mongoose.Schema({
    name: {type: String, required: true},
    path:{type: String, required: true},
    userId: {type: String, required: true},

    fileType: {type: String, enum: ['jpg', 'png', 'jpeg'] , required: true},
    

    creationDate: {type: Date, required:true},
    lastUpdate: {type: Date, require: true}

})

export const figureModel = mongoose.model('Figure', figureSchema, 'Figure');
export type figureType = HydratedDocument<InferSchemaType<typeof figureSchema>>

