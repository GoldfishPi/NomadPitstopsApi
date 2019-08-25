import { firebaseAdmin } from "./../helpers/firebase";
import { CommentModel } from "./../models/comments";

export const addPitstopComment = async (parent:any, args:any) => {

    console.log('recieved token', args.token);

    const user = await firebaseAdmin
        .auth()
        .verifyIdToken(args.token);

    if(!user) {
        return;
    }

    const comment = await CommentModel.create({
        type:'pitstop',
        linkedId:args.linkedId,
        text:args.text,
        uid:user.uid
    });

    return comment;
}

