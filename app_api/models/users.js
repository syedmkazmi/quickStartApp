/**
 * Created by syedkazmi on 23/11/2016.
 */

var mongoose = require('mongoose');

var userSchema = mongoose.schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    //TODO: Research and Setup password hashing system
    password: {type: String, required: true},
    organisation: {type: String, required: true},
    role: {type: String, required: true},

    //only if the organisation is a practice
    primaryOrgName: {type: String},
    practiceName: {type: String},
    cohort: {type: Number},

    lastLogin: {type: Date},
    signUpDate: {type: Date, default: Date.now()},

    accountApproved: {type: Boolean, default: false}

});

mongoose.model('Users', userSchema);

//TODO: Setup password reset functions/tokens and also accountConfirmation tokens