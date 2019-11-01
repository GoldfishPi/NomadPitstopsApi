var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { firebaseAdmin } from "./../helpers/firebase";
import { CommentModel } from "./../models/comments";
import { Pitstop } from "../models/pitstop";
import { PitstopImageModel } from "../models/image";
import axios from "axios";
export const getPitstops = () => __awaiter(this, void 0, void 0, function* () {
    const ps = yield Pitstop.find({})
        .populate('images');
    return ps.map(p => (Object.assign({}, p.toJSON(), { id: p.id, images: p.get('images') ? p.get('images') : [] })));
});
export const getPitstop = (parent, args) => __awaiter(this, void 0, void 0, function* () {
    const ps = yield Pitstop
        .findById(args.id)
        .populate('images');
    return ps;
});
export const getPitstopComments = (parent) => __awaiter(this, void 0, void 0, function* () {
    return yield CommentModel
        .find({
        linkedId: parent.id,
    })
        .sort({ createdAt: 'desc' });
});
export const addPitstopComment = (parent, args, { user }) => __awaiter(this, void 0, void 0, function* () {
    console.log('text', args.text);
    if (!user) {
        return;
    }
    const comment = yield CommentModel.create({
        type: 'pitstop',
        linkedId: args.id,
        text: args.text,
        uid: user.uid,
    });
    return comment;
});
export const getPitstopImages = (parent, args) => __awaiter(this, void 0, void 0, function* () {
    const ps = yield Pitstop
        .findById(parent.id)
        .populate('images');
    return;
    const images = yield PitstopImageModel.find({
        linkedId: parent.id
    });
    return images.map(image => image.get('link'));
});
export const addPitstopImage = (parent, { image, id }, { user }) => __awaiter(this, void 0, void 0, function* () {
    if (!user)
        return [];
    const { createReadStream, filename, mimetype, encoding } = yield image;
    const url = `gs://nomad-pit-stops.appspot.com/`;
    const bucket = firebaseAdmin
        .storage()
        .bucket(url);
    const path = `pitstops/${id}/${Date.now()}-${filename}`;
    yield new Promise(res => {
        createReadStream()
            .pipe(bucket.file(path).createWriteStream({
            contentType: mimetype,
            public: true,
            metadata: {
                custom: 'metadata'
            }
        }))
            .on('close', res)
            .on('finish', res);
    });
    const sig = yield bucket.file(path).getSignedUrl({
        expires: '2400',
        action: 'read',
    });
    const psImage = yield PitstopImageModel.create({
        uid: user.user_id,
        link: sig[0],
    });
    console.log('ps image', psImage.get('id'));
    console.log('pitstop id', id);
    const ps = yield Pitstop.findById(id);
    console.log('found ps', ps);
    const images = ps.images || [];
    const newImages = [
        ...images,
        psImage.get('id')
    ];
    yield Pitstop.findById(id)
        .update({
        images: newImages
    });
    console.log('done');
    return;
});
export const addPitstop = (parent, args, { user }) => __awaiter(this, void 0, void 0, function* () {
    if (!user)
        return;
    const { name, notes, connection, longitude, latitude } = args;
    const ps = yield Pitstop.create({
        name,
        notes,
        connection,
        longitude,
        latitude,
        loc: {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    });
    axios.post('https://api.netlify.com/build_hooks/5dba2f194119749b9c512ebe');
    return ps.toJSON();
});
//# sourceMappingURL=pitstop.js.map