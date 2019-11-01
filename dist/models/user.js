import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    access: { type: String, default: 'USER' },
    uid: { type: String, require: true }
});
UserSchema.set('toJSON', { virtuals: true });
export const UserModel = model('users', UserSchema);
//# sourceMappingURL=user.js.map