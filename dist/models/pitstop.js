import { Schema, model } from "mongoose";
const PitstopSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    notes: {
        type: String,
        require: false,
    },
    connection: {
        type: Number,
        require: true
    },
    longitude: {
        type: Number,
        require: true
    },
    latitude: {
        type: Number,
        require: true
    },
    loc: {
        type: { type: String },
        coordinates: [Number],
    },
    images: {
        type: [{
                type: Schema.Types.ObjectId,
                ref: 'pitstop-images',
            }],
        require: false
    }
});
PitstopSchema.index({ "loc": "2dsphere" });
export const Pitstop = model('Pitstop', PitstopSchema);
//# sourceMappingURL=pitstop.js.map