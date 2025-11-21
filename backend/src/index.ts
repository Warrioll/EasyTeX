import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import router from "./router";
import cookieParser from 'cookie-parser'
import { exec } from 'child_process'; 

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use('/',router());

 

 
const PORT =  process.env.BACKEND_PORT;
const MONGOURL = process.env.MONGO_URL

exec('docker build -t worker ../worker')

const connectToDatabase = async () =>{
    for(let i=0; i<10 ; i++){
        try{
             console.log('Trying to connect to database... ')
            await mongoose.connect(MONGOURL);
            mongoose.connection.on('error', (error: Error)=> console.log(error));
            console.log('Connected to database successfully')
            return
            
        }catch(e){
            console.log('Connection to database failed: ', e)
            await new Promise(resume => setTimeout(resume, 5000));
        }

          
    }
    throw new Error('Cannot establish connection to database!')
}

connectToDatabase().then(()=>{
    app.listen(PORT, ()=> console.log("Listening on port ", PORT))
})

