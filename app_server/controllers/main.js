/**
 * Created by syedkazmi on 04/11/2016.
 */

module.exports.index = function (req, res) {

    res.render('index', { title: 'Express', sess: 'test' });

};

module.exports.selectSession = function (req,res) {
    res.render('index', {title: 'Select Session', sess: 1});
};

module.exports.sessionOne = function (req,res) {
    res.render('index', {title: 'Session 1', sess: 1});
};

module.exports.sessionTwo = function (req,res) {
    res.render('index', {title: 'Session 2', sess: 2});
};