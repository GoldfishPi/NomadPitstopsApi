import { CommentModel } from "./../models/comments";
import { firebaseAdmin } from "../helpers/firebase";
import { UserModel } from "../models/user";

export const getComments = async () => {
    return await CommentModel
        .find({
        }) 
        .sort({createdAt:'desc'})
        
}

export const getComment = async (parent:any, args:any, context:any) => {
    return await CommentModel
        .findById(args.id)
        .sort({createdAt:'desc'})
}

export const getCommentUser = async (parent:any, args:any) => {
    console.log('parent id', parent.uid);
    return await UserModel
        .findOne({ uid:parent.uid });
}
