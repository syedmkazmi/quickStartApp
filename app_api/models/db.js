/**
 * Created by syedkazmi on 24/11/2016.
 */

var mongoose = require('mongoose');
var graceFulShutdown;
var dbURI = 'mongodb://syedkazmi:plzopen26@ds163417.mlab.com:63417/quickstartapptest'
mongoose.connect(dbURI);

/** MONITORING MONGOOSE CONNECTION EVENTS ...*/

// If connection is successful
mongoose.connection.on('connected', function(){
   console.log('Mongoose connected to ' + dbURI);
});

// If connection is unsuccessful
mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error ' + err);
});

// If connection is disconnected
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected from ' + dbURI);
});

graceFulShutdown = function (msg, callback) {
  mongoose.connection.close(function (){
     console.log('Mongoose discounted through ' + msg);
      callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', function (){
    graceFulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2')
    });
});

// For app termination
process.on('SIGNIT', function(){
    graceFulShutdown('app termination', function () {
        process.exit(0);
    });
});

// For heroku app termination
process.on('SIGTERM', function () {
   graceFulShutdown('Heroku app shutdown', function () {
       process.exit(0);
   });
});

require('./sessions');

