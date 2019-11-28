let mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost', {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('connected', function () {
    console.log(`MongoDB on ${db.host}:${db.port}`); 
});