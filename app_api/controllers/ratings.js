let mongoose = require('mongoose');
let rating = mongoose.model('rating');
let token = mongoose.model('token');
const h = require('../helpers/common');

module.exports.getAll = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    rating.find({}, (err, ratings) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }
        h.sendJsonResponse(res,200, ratings);
    });
};

module.exports.getOne = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    rating.findById(req.params.id, (err, rating) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }
        h.sendJsonResponse(res,200, rating);
    });
};

module.exports.create = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }



    rating.create(req.body, (err, rating) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }
        h.sendJsonResponse(res,201, rating);
    });
};

module.exports.update = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    rating.findById(req.params.id, (err, rating) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }

        if(req.body.name){
            rating.name = req.body.name;
        }
        if(req.body.city){
            rating.city = req.body.city;
        }
        if(req.body.student){
            rating.student = req.body.student;
        }
        if(req.body.ballrate){
            rating.ballrate = req.body.ballrate;
        }
        if(req.body.formobuch){
            rating.formobuch = req.body.formobuch;
        }
        if(req.body.dateStart){
            rating.dateStart = req.body.dateStart;
        }
        if(req.body.dateFinish){
            rating.dateFinish = req.body.dateFinish;
        }


        rating.save((err, rating) => {
            if(err){
                h.sendJsonResponse(res,400, err);
            }
            h.sendJsonResponse(res,200, rating);
        });

    });

};

module.exports.delete = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    rating.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }
        h.sendJsonResponse(res,204, null);
    });
};