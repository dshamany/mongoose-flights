let express = require('express');
let router = express.Router();
let ticketCtrl = require('../controllers/tickets');

router.get('/flights/:id/tickets/new', ticketCtrl.index);
router.post('/flights/:id/tickets', ticketCtrl.create);

module.exports = router