"use strict"
process.on('uncaughtException',function(e){
    console.error(e);
})

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const httpserverConfig = require('./service/config/httpserver.config');
// require('./service/model/init').init();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.resolve(__dirname+'/public')));
app.use('/api',require('./service/router/api.router'));

const server = app.listen(httpserverConfig.port,httpserverConfig.host, function() {
    var port = server.address().port;
    console.log('Open http://localhost:%s', port);
});
