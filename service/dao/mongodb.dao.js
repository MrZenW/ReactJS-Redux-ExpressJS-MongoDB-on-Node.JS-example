"use strict"

const mongodbConfig = require('../config/mongodb.config');
const _m = module.exports = require("mongoose");;

_m.connect(mongodbConfig.uri,mongodbConfig.options,function(err,connection){

    if(!!err)
        console.error(err),
        process.exit(1);
    
    if(!err)
        console.log('MongoDB connect successed');
});
