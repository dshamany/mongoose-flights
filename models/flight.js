var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA', 'SAN'],
        default: 'SEA'
    },
    arrival: Date
});

let flightSchema = new Schema({
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Southwest', 'United']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 99999,
    },
    departs: {
        type: Date,
        default: () => {
            let today = new Date();
            return new Date(today.setFullYear(today.getFullYear() + 1));
        }
    },
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA', 'SAN'],
        default: 'SEA'
    },
    destinations: [destinationSchema],
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
});

module.exports = mongoose.model('Flight', flightSchema);