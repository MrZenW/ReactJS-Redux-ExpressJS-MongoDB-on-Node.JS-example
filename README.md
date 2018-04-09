An example which uses " ReactJS and Redux and ExpressJS and MongoDB on Node.JS"
-------------------------

## HOW TO INSTALL
Using npm you can install the demo project very easy. Any problem please contact me at [zenyes@gmailcom](mailto:zenyes@gmailcom)

## Environment

Frist of all, you need to install [Node.JS](http://www.nodejs.org) and [NPMJS](http://www.npmjs.org) and [MongoDB](http://www.mongodb.com).

## Install-steps
1. Run the MongoDB server in port `27017`
1. Go to the project's root folder
1. Run: `npm install`
1. When npm finished the execution,build frond-end: `npm run webpack`
1. Run the back-end server: `npm run server` . The back-end server will listen in port `2000`


## Notice
1. If you want change the back-end mongodb client connect to another mongodb port you can modify the file `mongodb.config.json` in `project-folder/service/config/`
1. If you want change the server to listen another port you can modify the file `httpserver.config.json` in `project-folder/service/config/`
1. If there isn't folder `project-folder/public` please mkdir it.
