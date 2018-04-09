"use strict"


const talkModel = require('../model/talk.model');


const _m = module.exports = {};

_m.index = function(req,res,next){
    
    talkModel.getList().then(function(result){
        // console.log('result is ',result);
        res.json(result);
    },function(err){
        res.json(err);
    });
};

_m.newTalk = function(req,res,next){

    talkModel.newTalk(req.body).then(function(result){
        res.json(result);
    },function(err){
        res.json(err);
    });
};

_m.vote = function(req,res,next){
    let talkId = req.params.talkId;
    console.log(talkId,'talkid');
    talkModel.vote(talkId).then(function(result){
        res.json(result);
    },function(err){
        res.json(err);
    });
};

_m.getDetail = function(req,res,next){
    let talkId = req.params.talkId;
    console.log(talkId,'talkid');
    talkModel.getTalk(talkId).then(function(result){
        res.json(result);
    },function(err){
        res.json(err);
    });
};