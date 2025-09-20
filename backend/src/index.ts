import express from "express"
import mongoose from "mongoose"
//import dotenv from "dotenv"
import cors from "cors";
import bodyParser from "body-parser"
import router from "./router";
import cookieParser from 'cookie-parser'
//import session from 'express-session'

const app = express();
//dotenv.config()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
// app.use(
//     session({
//       secret: 'easytexxx', // Klucz do podpisywania sesji
//       resave: true, 
//       saveUninitialized: true,
//       cookie: {
//         httpOnly: true, 
//         maxAge:  60 * 60 * 1000, // godz
//       },
//     })
//   );
// app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json());
app.use('/',router());

 

 
//const PORT = process.env.PORT;
const PORT =  process.env.BACKEND_PORT;
const MONGOURL = process.env.MONGO_URL
//const MONGOURL = "mongodb://localhost:27017/EasyTeX"
//const MONGOURL = "mongodb://user:pass@mongodb/EasyTeX?authSource=admin"

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



//mongoose.Promise = Promise;  
// mongoose.connect(MONGOURL);
// mongoose.connection.on('error', (error: Error)=> console.log(error));

// app.listen(PORT, ()=> console.log("Listening on port ", PORT))

connectToDatabase().then(()=>{
    app.listen(PORT, ()=> console.log("Listening on port ", PORT))
})

