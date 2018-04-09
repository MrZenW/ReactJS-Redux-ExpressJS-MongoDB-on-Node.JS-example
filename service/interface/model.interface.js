"use strict"

module.exports = {
    "_mongodbConnection" : null,
    "setMongodbDI" : function(mongodbConnection){
        this._mongodbConnection = mongodbConnection;
    },
    "getMongodbDI" : function(){
        return this._mongodbConnection;
    }
};