const mongoose = require('mongoose');
const creds = require('../config.json');

export const connect = () => {
    mongoose.connect(
        `mongodb://${creds.db_username}:${
        creds.db_password
    }@ds139243.mlab.com:39243/nomad_pitstops`
    );
    mongoose.connection.on('connected', function() {
        console.log('Connected to db');
    });

    module.exports = mongoose;
}
