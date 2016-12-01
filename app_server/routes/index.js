var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/main');

/* GET home page. */
router.get('/', ctrl.index);

/* GET sessions page. */
router.get('/session', ctrl.selectSession);

/* GET session 1 survey page */
router.get('/session/1', ctrl.sessionOne);

/* GET session 2 survey page */
router.get('/session/2', ctrl.sessionTwo);

module.exports = router;
