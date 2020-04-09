var express = require('express');
var router = express.Router();
let ctrlRatings = require('../controllers/ratings');
let ctrlAuth = require('../controllers/auth');

router.get('/ratings', ctrlRatings.getAll);
router.get('/ratings/:id', ctrlRatings.getOne);
router.post('/ratings', ctrlRatings.create);
router.put('/ratings/:id', ctrlRatings.update);
router.delete('/ratings/:id', ctrlRatings.delete);

router.post('/signup', ctrlAuth.signup);
router.post('/login', ctrlAuth.login);
router.get('/logout/:login', ctrlAuth.logout);
router.delete('/selfremove/:login', ctrlAuth.selfremove);

module.exports = router;