"use strict"




const mongodbConfig = require('../config/mongodb.config');
const mongoose = require("mongoose");


const _m = module.exports = function(){};
_m.init = function(){
    mongoose.connect(mongodbConfig.uri,mongodbConfig.options,function(err,connection){
        if(!!err){
            console.error(err);
            process.exit(1);
        }else{
            console.log(connection);
            console.log(mongoose===connection);
            setConnectionDI(connection);
        }
    });
}

const modelNameList = ['talk','user'];
function setConnectionDI(connection){
    for(let modelName of modelNameList){
        let modelObject = require('./'+modelName+'.model');
        if('function' == typeof modelObject.setMongodbDI){
            modelObject.setMongodbDI(connection);
        }else{
            console.warn("The `"+modelName+"` model doesn't have setMongodbDI function.");
        }
    }
    
}