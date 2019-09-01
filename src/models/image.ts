import { model, Schema } from 'mongoose';

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

