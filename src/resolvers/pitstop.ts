import { firebaseAdmin } from "./../helpers/firebase";
import { CommentModel } from "./../models/comments";
import { Pitstop } from "../models/pitstop";
import { PitstopImageModel } from "../models/image";

export const getPitstops = async () => {
    const ps = await Pitstop.find({})
        .populate('images')
    return ps.map(p => ({
        ...p.toJSON(),
        images: p.get('images') ? p.get('images') : []
    }));
}

export const getPitstop = async (parent:any, args:any) => {
    const ps =  await Pitstop
        .findById(args.id)
        .populate('images')
    return ps;
}

export const getPitstopComments = async (parent:any) => {
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
    const ps = await Pitstop
        .findById(parent.id)
        .populate('images')
    return;
    const images =  await PitstopImageModel.find({
        linkedId:parent.id
    });
    return images.map(image => image.get('link'));
}

export const addPitstopImage = async (parent:any, { image, id }:any, {user}:any) => {

    if(!user)return [];

    const { createReadStream, filename, mimetype, encoding } = await image;
    const url = `gs://nomad-pit-stops.appspot.com/`;

    const bucket = firebaseAdmin
        .storage()
        .bucket(url);

    const path = `pitstops/${id}/${Date.now()}-${filename}`;

    await new Promise(res => {
        createReadStream()
            .pipe(bucket.file(path).createWriteStream({
                contentType:mimetype,
                public:true,
                metadata: {
                    custom: 'metadata'
                }
            }))
            .on('close', res)
            .on('finish', res)
    });

    const sig = await bucket.file(path).getSignedUrl({
        expires:'2400',
        action:'read',
    });

    const psImage = await PitstopImageModel.create({
        uid: user.user_id,
        link: sig[0],
    });

    console.log('ps image', psImage.get('id'));
    console.log('pitstop id', id);
    const ps:any = await Pitstop.findById(id);
    console.log('found ps', ps);
    
    const images = ps.images || [];
    const newImages = [
        ...images,
        psImage.get('id')
    ];
    await Pitstop.findById(id)
        .update({
            images:newImages
        });
    console.log('done');

    return;
}

export const addPitstop = async (parent:any, args:any, {user}:any) => {
    if(!user)return new Error('Bad Auth');
    const { name, notes, connection, longitude, latitude } = args;
    const ps = await Pitstop.create({
        name,
        notes,
        connection,
        longitude,
        latitude
    });
    return ps.toJSON();
}

