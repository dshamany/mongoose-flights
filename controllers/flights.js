let Flight = require('../models/flight');
let Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    erase,
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function index(req, res) {
    Flight.find({}, (err, flights) => {
        res.render('flights', {
            flights,
            title: 'Flights',
            toDateString,
        });
    });
}

function newFlight(req, res) {
    res.render('flights/new', { title: 'New Flight' });
}

function create(req, res) {
    // Remove empty fields before saving
    // to produce correct errors
    for (let key in req.body) {
        if (req.body === '') { delete req.body[key]; }
    }

    let flight = new Flight(req.body);
    flight.save((err) => {
        if (err) {
            console.log(`Error: ${err}`);
            return res.render('flights/new', { title: 'New Flight' });
        }
        res.redirect('/flights');
    });
}

// Helper Functions
function toDateString(time) {
    time = time.toLocaleDateString();
    let dateComponents = time.split('/');
    let month = months[dateComponents[0]];
    let date = dateComponents[1];
    let year = dateComponents[2];

    return `${month} ${date}, ${year}`;
}

function show(req, res) {
    Flight.findById(req.params.id, (err, flight) => {
        Ticket.find({ flight: req.params.id }, (err, tickets) => {
            res.render(`flights/show`, {
                title: "Flight Detail",
                flight,
                dateFormatted: toDateString(flight.departs),
                tickets
            });
        });
    });
}

function erase(req, res) {
    Flight.findByIdAndDelete(req.params.id, () => {
        res.redirect('/flights');
    });
}