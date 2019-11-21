let Ticket = require('../models/ticket');
let Flight = require('../models/flight');
module.exports = {
    index,
    create
}

function index(req, res) {
    Flight.findById(req.params.id, function (err, flight) {

        // create seat options
        function seats() {
            let letters = ['A', 'B', 'C', 'D', 'E', 'F'];
            let _seats = [];
            for (let i = 1; i < 100; ++i) {
                for (letter of letters) {
                    let seatCombo = letter + i;
                    _seats.push(seatCombo);
                }
            }
            return _seats;
        };

        let allSeats = seats();

        Ticket.find({ flight: flight._id }, (err, tickets) => {
            let tmp = [];
            for (ticket of tickets) {
                tmp.push(ticket.seat);
            }
            console.log(tmp);
            res.render('tickets/new', { flight, allSeats, sold: tmp })
        })
    });
}

function create(req, res) {
    Flight.findById(req.params.id, (err, flight) => {
        req.body.flight = flight._id;
            Ticket.create(req.body, (err, ticket) => {
                flight.tickets.push(ticket);
                res.redirect(`/flights/${flight._id}`);
        });
    });
}