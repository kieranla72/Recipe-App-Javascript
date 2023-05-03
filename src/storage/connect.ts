import { NextFunction } from "express";
import mongoose from "mongoose";

let mongoConnection: typeof mongoose;

export const connect = async (_: any, __: any, next: NextFunction) => {

    if (!mongoConnection) {
        mongoConnection = await mongoose.connect('mongodb://127.0.0.1:27017/test');
    }
    next();
    return mongoConnection;
}