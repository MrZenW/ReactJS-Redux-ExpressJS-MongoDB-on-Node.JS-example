"use strict"

import {createStore} from 'redux'

export const STATE_TYPE_NORMAL_TALK_DETAIL = 'STATE_TYPE_NORMAL_TALK_DETAIL';
export const STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING = 'STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING';
export const STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS = 'STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS';
export const STATE_TYPE_REQUEST_TALK_DETAIL_ERROR = 'STATE_TYPE_REQUEST_TALK_DETAIL_ERROR';


const reducer = function(nowState={type:STATE_TYPE_NORMAL_TALK_DETAIL}, nextAction){
    
    switch(nextAction.type){
        case STATE_TYPE_NORMAL_TALK_DETAIL:
            if(STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS == nowState.type || STATE_TYPE_REQUEST_TALK_DETAIL_ERROR == nowState.type)
                return nextAction;
            return nowState;

        case STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING:
            if(STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING == nowState.type)
                return nowState;
            return nextAction;

        case STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS:
        case STATE_TYPE_REQUEST_TALK_DETAIL_ERROR:
            if(STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING == nowState.type)
                return nextAction;
            return nowState;
            
        default: return nowState;
    }
}

const storesLibrary = {};
export const createTalkDetailStore = function(name){
    let store = createStore(reducer);
    if(!!name)storesLibrary[name] = store;
    return store;
};


export const getTalkDetailStore = function(name){
    return storesLibrary[name];
};