const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    access: { type: String, default: 'USER' }
});

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
