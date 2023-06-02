import mongoose from "mongoose";
import express, {Request} from "express";
import {AuthenticatedRequest} from "./app/config/AuthenticatedRequest";
import {userRouter} from "./app/router/user/UserRouter";
import {driverRouter} from "./app/router/driver/DriverRouter";

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/VTC')

app.use(express.json());
//middleware
app.get('/status', (req, res) => {
    return res.sendStatus(200);
});
app.use('/user', userRouter);
app.use('/driver', driverRouter);
app.listen(3000, () => {
    console.log('server listening on port 3000');
})