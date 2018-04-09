"use strict"

import {createStore} from 'redux'

export const STATE_TYPE_NORMAL_NEW_TALK = 'STATE_TYPE_NORMAL_NEW_TALK';
export const STATE_TYPE_REQUEST_NEW_TALK_FETCHING = 'STATE_TYPE_REQUEST_NEW_TALK_FETCHING';
export const STATE_TYPE_REQUEST_NEW_TALK_SUCCESS = 'STATE_TYPE_REQUEST_NEW_TALK_SUCCESS';
export const STATE_TYPE_REQUEST_NEW_TALK_ERROR = 'STATE_TYPE_REQUEST_NEW_TALK_ERROR';

const reducer = function(nowState={type:STATE_TYPE_NORMAL_NEW_TALK}, nextAction){
    
    switch(nextAction.type){
        case STATE_TYPE_NORMAL_NEW_TALK:
            if(STATE_TYPE_REQUEST_NEW_TALK_SUCCESS == nowState.type || STATE_TYPE_REQUEST_NEW_TALK_ERROR == nowState.type)
                return nextAction;
            return nowState;

        case STATE_TYPE_REQUEST_NEW_TALK_FETCHING:
            if(STATE_TYPE_REQUEST_NEW_TALK_FETCHING == nowState.type)
                return nowState;
            return nextAction;

        case STATE_TYPE_REQUEST_NEW_TALK_SUCCESS:
        case STATE_TYPE_REQUEST_NEW_TALK_ERROR:
            if(STATE_TYPE_REQUEST_NEW_TALK_FETCHING == nowState.type)
                return nextAction;
            return nowState;
            
        default: return nowState;
    }
}

const storesLibrary = {};
export const createNewTalkStore = function(name){
    let store = createStore(reducer);
    if(!!name)storesLibrary[name] = store;
    return store;
};


export const getNewTalkStore = function(name){
    return storesLibrary[name];
};