var express = require('express');
var router = express.Router();
var flightCtrl = require('../controllers/flights');


/* GET users listing. */
router.get('/', flightCtrl.index);
router.get('/new', flightCtrl.new);
router.post('/', flightCtrl.create);
router.get('/:id', flightCtrl.show);
router.delete('/:id', flightCtrl.erase);

module.exports = router;
