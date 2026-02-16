import mongoose from "mongoose";
import { InferSchemaType, HydratedDocument } from "mongoose";

const userSchema= new mongoose.Schema({
    email: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
})

export const userModel = mongoose.model('User', userSchema, 'User');
export type userType = HydratedDocument<InferSchemaType<typeof userSchema>>

