
import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
    type: {
        type: String,
        require:true,
    },
    uid: {
        type: String,
        require:true,
    },
    linkedId: {
        type: String,
        require:true,
    },
    text: {
        type: String,
        require: true,
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date
    }
});

export const CommentModel = model('Comment', CommentSchema);
