import { CommentModel } from "./../models/comments";
import { firebaseAdmin } from "../helpers/firebase";

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

export const getCommentUser = (parent:any, args:any) => {
    return firebaseAdmin
        .auth()
        .getUser(parent.uid)    
}
