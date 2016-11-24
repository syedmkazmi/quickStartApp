/**
 * Created by syedkazmi on 23/11/2016.
 */

var mongoose = require('mongoose');

var survey =  new mongoose.schema({

    sessionNo: {type: Number, required: true, min: 1, max: 6},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: {type: String, required: true},
    deliveryPartner: {type: String, required: true},
    programme: {type: String, required: true},

    coachName: {type: String},
    practiceManagerName: {type: String},

    q1: {type: String, required: true},
    q2: {type: String, required: true},
    q3: {type: String, required: true},
    q4: {type: String, required: true},
    q5: {type: String, required: true}

});

var happySadSchema = new mongoose.schema({

    practiceName: {type: String, required: true},
    primaryOrgName: {type: String, required: true},
    cohort: {type: Number, required: true},

    poorSessions: {type: Number},
    okSessions: {type: Number},
    wellSessions: {type: Number},
    veryWellSessions: {type: Number},

    sessionOneStatus: {type: Boolean, default: false},
    sessionTwoStatus: {type: Boolean, default: false},
    sessionThreeStatus: {type: Boolean, default: false},
    sessionFourStatus: {type: Boolean, default: false},
    sessionFiveStatus: {type: Boolean, default: false},
    sessionSixStatus: {type: Boolean, default: false},

    practiceManager:[survey],
    deliveryCoach: [survey]

});

var pm = mongoose.model('HpSurvey', happySadSchema);
var coach = mongoose.model('HpSurvey', happySadSchema);