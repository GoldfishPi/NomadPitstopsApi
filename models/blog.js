const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    dateCreated: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    snippet: {
        type: String
    },
    thumbnail: {
        type: String
    },
    active: {
        type: Boolean,
        require: true,
        default: false
    }
});

module.exports = mongoose.model('Blog', BlogSchema);
