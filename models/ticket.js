let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F][1-99]\d?/
    },
    price: {
        type: Number,
        min: 0
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);