import { firebaseAdmin } from "./../helpers/firebase";
import { CommentModel } from "./../models/comments";
import { Pitstop } from "../models/pitstop";

export const addPitstopComment = async (parent:any, args:any) => {

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

export const getPitstopImages = async (parent:any, args:any) => {
    console.log('parent id', parent.id);
    const url = `gs://nomad-pit-stops.appspot.com/`;

    const bucket = firebaseAdmin
        .storage()
        .bucket(url);

    const files = await bucket
        .getFiles({
            prefix:`pitstops/${parent.id}/`
        });

    const signedUrlsPromise = files[0].map(async file => {
        console.log('signing', file.metadata);
        const signedFile = await bucket.file(file.name).getSignedUrl({
            action:'read',
            expires:'03-01-2500'
        });
        return signedFile[0];
    });

    const signedUrls = await Promise.all(signedUrlsPromise);
    console.log('urls lol', signedUrls);

    return signedUrls;

}

export const addPitstopImage = async (parent:any, args:any) => {
    console.log('id', args.linkedId);
    const pitstop = await Pitstop
        .findById(args.linkedId)
        .update({
            images: [
                {
                    uid:'lol',
                    link:'moose',
                }
            ]
        })
    console.log('pitstop', pitstop);
}

