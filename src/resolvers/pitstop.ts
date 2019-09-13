import { firebaseAdmin } from "./../helpers/firebase";
import { CommentModel } from "./../models/comments";
import { Pitstop } from "../models/pitstop";

export const getPitstops = async (parent:any, args:any) => {
    return await Pitstop.find({});
}

export const getPitstop = async (parent:any, args:any) => {
    return await Pitstop.findById(args.id);
}

export const getPitstopComments = async (parent:any, args:any) => {
    return await CommentModel.find({
        linkedId:parent.id
    })
}

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

export const addPitstopImage = async (parent:any, { image, linkedId }:any) => {
    const { stream, filename, mimetype, encoding } = await image;
    console.log('name', filename);
    const url = `gs://nomad-pit-stops.appspot.com/`;

    const bucket = firebaseAdmin
        .storage()
        .bucket(url);
    return;
    const pitstop = await Pitstop
        .findById(linkedId)
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

