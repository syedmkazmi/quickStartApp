/**
 * Created by syedkazmi on 28/11/2016.
 */

var express = require('express');
var router = express.Router();
var ctrlSession = require('../controllers/sessionsCtrl');

    router.post('/session/survey', ctrlSession.addSurvey);
    router.get('/session/survey', ctrlSession.getSurvey);


module.exports = router;
