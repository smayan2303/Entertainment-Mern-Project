import dotenv from 'dotenv';
dotenv.config(); // Loads environment variables from the .env file

import express from "express";
//import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";


const app = express();


//allows the app to send and recieve data in json format
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());


app.get('/', (request, response) =>{
    console.log(request);
    return response.status(234).send('Welcome to this project');
});

//Basically defining the routes and saying to use that prefix for the all routes in booksRoute
app.use('/books', booksRoute);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('App Connected to Database');
    app.listen(process.env.PORT, ()=> {
        console.log(`App is listening to port: ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(error);
})