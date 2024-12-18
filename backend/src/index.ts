import express from "express"
import mongoose from "mongoose"
//import dotenv from "dotenv"
import cors from "cors";
import bodyParser from "body-parser"
import router from "./router";
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express();
//dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(
    session({
      secret: 'easytexxx', // Klucz do podpisywania sesji
      resave: true, 
      saveUninitialized: true,
      cookie: {
        httpOnly: true, 
        maxAge:  60 * 60 * 1000, // godz
      },
    })
  );
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/',router());

 
//const PORT = process.env.PORT;
const PORT = 8100;
//const MONGOURL = process.env.MONGO_URL
const MONGOURL = "mongodb://localhost:27017/EasyTeX"


mongoose.Promise = Promise;  
mongoose.connect(MONGOURL);
mongoose.connection.on('error', (error: Error)=> console.log(error));


app.listen(PORT, ()=> console.log("Listening on port ", PORT))