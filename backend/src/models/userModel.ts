import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    email: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
})

export const userModel = mongoose.model('User', userSchema, 'User');

//export const getDocuments = () => documentModel.find();
//export const createDocument = (values: Record<string, any>) => new documentModel(values).save().then((document)=>document.toObject());
