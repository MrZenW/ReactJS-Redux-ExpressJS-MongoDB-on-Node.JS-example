"use strict"

const mongodbDao = require('../dao/mongodb.dao');
const Schema = mongodbDao.Schema;
/**
 * Talk schema
 */
var TalkSchema = new Schema({
    
    title: {
      type: String,
      index: true,
      trim: true,
      required: 'Title cannot be blank'
    },
    description: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      required: 'User Name cannot be blank'
    },
    voteNumber:{
        type: Number,
        default: 0
    },
    created: {
        type: Number,
        default: 0
    }
  });

mongodbDao.model('TalkSchema', TalkSchema);

const _m = module.exports = function(){};


_m.getList = function(){
    
    return new Promise(function(resolve,reject){
        let TalkModel = mongodbDao.model('TalkSchema');
        TalkModel.find({}).sort({"voteNumber":-1}).sort({"created":-1}).exec(function(err,result){
            if(!!err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });  
};

_m.vote = function(talkId){
    return new Promise(function(resolve, reject){
        let TalkModel = mongodbDao.model('TalkSchema');
        console.log(talkId,'talkId');
        TalkModel.update({'_id':talkId},{$inc:{voteNumber:1}},function(err){
            if(!!err){
                return reject(err);
            }

            return resolve({message:'update success'});
        });
    });
};
_m.newTalk = function(talkData){
    talkData.created = Date.now();
    return new Promise(function(resolve, reject){
        let TalkModel = mongodbDao.model('TalkSchema');
        let talk = TalkModel(talkData);
        talk.save(function(err,insertDoc){
            if(!!err){
                return reject(err);
            }
            return resolve(insertDoc);
        });
    });

};
_m.getTalk = function(talkId){
    return new Promise(function(resolve, reject){
        let TalkModel = mongodbDao.model('TalkSchema');
        console.log(talkId,'talkId');
        TalkModel.findOne({'_id':talkId}).exec(function(err,result){
            if(!!err){
                return reject(err);
            }

            return resolve(result);
        });
    });
};


