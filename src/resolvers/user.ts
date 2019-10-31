import { UserModel } from "../models/user";
import { Types } from "mongoose";

export const getUsers = async () => {
    return await UserModel.find({});
}
export const addUser = async (parent:any,{email, uid, firstName, lastName, username}:any) => {
    try {
        await UserModel.create({
            firstName,
            lastName,
            email,
            username,
            uid,
        });
    } catch(e) {
        console.log('err', e);
        return false;
    }
    return true;
}
