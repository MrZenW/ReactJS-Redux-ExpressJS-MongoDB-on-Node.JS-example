"use strict"

const express = require('express');
const router = module.exports = express.Router();

const talkController = require('../controller/talk.controller');


router.all('/talk_list',talkController.index);
router.all('/new_talk',talkController.newTalk);
router.all('/vote/:talkId',talkController.vote);
router.all('/get_detail/:talkId',talkController.getDetail);

// router.put('/user',userController.createUser);
// router.post('/user/:username',userController.loginUser);