import mongoose from "mongoose";
import express from "express";
import { userRouter } from "./app/router/UserRouter";


const app = express();

mongoose.connect('mongodb+srv://vtc_75:bootcode@cluster0.ayyum.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json());


app.get('/status', (req, res) => {
    return res.sendStatus(200);
});

app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('server listening on port 3000');
})