/**
 * Created by syedkazmi on 28/11/2016.
 */

var mongoose = require('mongoose');

var survey =  new mongoose.Schema({

    sessionNo: {type: Number, required: true, min: 1, max: 6},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: {type: String, required: true},
    deliveryPartner: {type: String, required: true},
    programme: {type: String, required: true},

    coachName: {type: String},
    practiceManagerName: {type: String},

    //TODO: Check with sean whether more then 1 module can be done in a single session.
    modules: {type: String, required: true},

    q1: {type: String, required: true},
    q2: {type: String, required: true},
    q3: {type: String, required: true},
    q4: {type: String, required: true},
    q5: {type: String, required: true}

});

var happySadSchema = new mongoose.Schema({

    practiceName: {type: String, required: true},
    primaryOrgName: {type: String, required: true},
    cohort: {type: Number, required: true},
    deliveryPartner: {type: String, required: true},

    poorSessionsPracticeManager: {type: Number, default: 0},
    okSessionsPracticeManager: {type: Number, default: 0},
    wellSessionsPracticeManager: {type: Number, default: 0},
    veryWellSessionsPracticeManager: {type: Number, default:0},

    poorSessionsCoach: {type: Number, default: 0},
    okSessionsCoach: {type: Number, default: 0},
    wellSessionsCoach: {type: Number, default: 0},
    veryWellSessionsCoach: {type: Number, default:0},

    sessionOneStatus: {type: Boolean, default: false},
    sessionTwoStatus: {type: Boolean, default: false},
    sessionThreeStatus: {type: Boolean, default: false},
    sessionFourStatus: {type: Boolean, default: false},
    sessionFiveStatus: {type: Boolean, default: false},
    sessionSixStatus: {type: Boolean, default: false},

    sessionSurvey: [survey],
    practiceManagerSurvey:[survey],
    deliveryCoachSurvey: [survey]

});

//TODO: Figure out how to use a single data model for multiple mongodb collections
mongoose.model('Surveys', happySadSchema);