/**
 * Created by syedkazmi on 28/11/2016.
 */

var mongoose = require('mongoose');
var survey = mongoose.model('Surveys');

var sessionExists;

/* Session Survey Functions */
function sendJsonResponse(res, status, content) {
  res.status(status);
    res.json(content);
}
function incrementSessionsTypes(req, res, data) {
    if(!data){
        sendJsonResponse(res, 404, {"message": "survey not found"})
    } else {

        if(req.body.role === 'practice manager'){
            if(req.body.q1 === "poor"){
                data.poorSessionsPracticeManager += 1;
            } else if(req.body.q1 === "ok"){
                data.okSessionsPracticeManager += 1;
            } else if(req.body.q1 === "well"){
                data.wellSessionsPracticeManager += 1;
            } else if(req.body.q1 === "very well"){
                data.veryWellSessionsPracticeManager += 1;
            }
        } else if(req.body.role === 'coach'){
            if(req.body.q1 === "poor"){
                data.poorSessionsCoach += 1;
            } else if(req.body.q1 === "ok"){
                data.okSessionsCoach += 1;
            } else if(req.body.q1 === "well"){
                data.wellSessionsCoach += 1;
            } else if(req.body.q1 === "very well"){
                data.veryWellSessionsCoach += 1;
            }
        }

    }

}
function checkIfSessionExists(req,curr){
    //TODO: Figure out how to properply detect session
    for(var i=0;i<curr.length;i++){
       if(req.body.sessionNo == curr[i].sessionNo){
           console.log("got " + curr[i].sessionNo);
           return true;
       }
    }

}
function pushSurveyToArray (req, res, data){
    if(!data){
        sendJsonResponse(res, 404, {"message": "survey not found"});
    } else {

        if(req.body.role === 'practice manager'){

            sessionExists = checkIfSessionExists(req,data.practiceManagerSurvey);

            if(sessionExists == true){
                sendJsonResponse(res, 401, {"message": "session already exists"});
            } else if(sessionExists !== true){
                data.practiceManagerSurvey.push ({
                    sessionNo: req.body.sessionNo,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    role: req.body.role,
                    deliveryPartner: req.body.deliveryPartner,
                    coachName: req.body.coachName,
                    programme: req.body.programme,
                    modules: req.body.modules,
                    q1: req.body.q1,
                    q2: req.body.q2,
                    q3: req.body.q3,
                    q4: req.body.q4,
                    q5: req.body.q5
                });

                incrementSessionsTypes(req, res, data);

                data.save(function (err, data) {
                    if(err) {
                        sendJsonResponse(res, 400, err)
                    } else{
                        sendJsonResponse(res, 201, data);
                    }
                })
            }

            } else if(req.body.role === 'coach') {

            sessionExists = checkIfSessionExists(req,data.deliveryCoachSurvey);

            if(sessionExists == true){
                sendJsonResponse(res, 401, {"message": "session already exists"});
            } else if(sessionExists !== true){
                data.deliveryCoachSurvey.push ({
                    sessionNo: req.body.sessionNo,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    role: req.body.role,
                    deliveryPartner: req.body.deliveryPartner,
                    practiceManagerName: req.body.practiceManagerName,
                    programme: req.body.programme,
                    modules: req.body.modules,
                    q1: req.body.q1,
                    q2: req.body.q2,
                    q3: req.body.q3,
                    q4: req.body.q4,
                    q5: req.body.q5
                });

                incrementSessionsTypes(req, res, data);

                data.save(function (err, data) {
                    if(err) {
                        sendJsonResponse(res, 400, err)
                    } else{
                        sendJsonResponse(res, 201, data);
                    }
                })
            }
        }

        }

    }

/* Controllers */

// add a new session survey or update it if one exists.
module.exports.addSurvey = function (req, res){

    survey.findOne({practiceName: req.body.practiceName, primaryOrgName: req.body.primaryOrgName, cohort: req.body.cohort, deliveryPartner: req.body.deliveryPartner}, function (err, data) {

        if(data){
            pushSurveyToArray(req, res, data);
        } else if(!data){

        var newSurvey = new survey();

        newSurvey.practiceName = req.body.practiceName;
        newSurvey.primaryOrgName = req.body.primaryOrgName;
        newSurvey.cohort = req.body.cohort;
        newSurvey.deliveryPartner = req.body.deliveryPartner;

        if(req.body.role === 'practice manager'){

            newSurvey.practiceManagerSurvey = {
                sessionNo: req.body.sessionNo,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                deliveryPartner: req.body.deliveryPartner,
                coachName: req.body.coachName,
                programme: req.body.programme,
                modules: req.body.modules,
                q1: req.body.q1,
                q2: req.body.q2,
                q3: req.body.q3,
                q4: req.body.q4,
                q5: req.body.q5
            };
        } else if(req.body.role === 'coach'){

            newSurvey.deliveryCoachSurvey = {
                sessionNo: req.body.sessionNo,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                deliveryPartner: req.body.deliveryPartner,
                practiceManagerName: req.body.practiceManagerName,
                programme: req.body.programme,
                modules: req.body.modules,
                q1: req.body.q1,
                q2: req.body.q2,
                q3: req.body.q3,
                q4: req.body.q4,
                q5: req.body.q5
            };
        }
            incrementSessionsTypes(req, res, newSurvey);

        newSurvey.save(function (err, data) {
            if(err) {
                sendJsonResponse(res, 400, err)
            } else{
                sendJsonResponse(res, 200, data);
            }
        });
   }
});
};
// get all surveys for all delivery partners
module.exports.getSurvey = function (req,res) {

    survey.find(function (err, data) {
        if(err){
            sendJsonResponse(res, 400, err);
        } else if(data){
            res.json(data);
        }
    })
};