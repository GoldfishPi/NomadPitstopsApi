import { model, Schema, Types } from 'mongoose';

export const ImageSchema = new Schema({
    uid: {
        type:String,
        require:true,
    },
    link: {
        type:String,
        require:true,
    }
});

export const PitstopImageModel = model('pitstop-images', ImageSchema);

