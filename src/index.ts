import mongoose from "mongoose";
import express, {Request} from "express";
import {AuthenticatedRequest} from "./app/config/AuthenticatedRequest";
import {userRouter} from "./app/router/UserRouter";

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/VTCProject');

app.use(express.json());
//middleware
app.get('/status', (req, res) => {
    return res.sendStatus(200);
});
app.use('/user', userRouter);
app.listen(3000, () => {
    console.log('server listening on port 3000');
})