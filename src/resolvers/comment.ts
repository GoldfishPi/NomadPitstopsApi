import { CommentModel } from "./../models/comments";
import { firebaseAdmin } from "../helpers/firebase";

export const getComments = async () => {
    return await CommentModel.find({}); 
}

export const getComment = async (parent:any, args:any, context:any) => {
    console.log('context', context.user);
    return await CommentModel.findById(args.id); 
}

export const getCommentUser = (parent:any, args:any) => {
    return firebaseAdmin
        .auth()
        .getUser(parent.uid)    
}
