"use strict"

import {createStore} from 'redux'

// export const STATE_SHOW_MAIN_LIST = {
//     type:'SHOW_MAIN_LIST',
// };
// export const STATE_SHOW_EDIT_BOARD = {
//     type:'SHOW_EDIT_BOARD',
// };
// export const STATE_SHOW_TALK_DETAIL = {
//     type:'SHOW_TALK_DETAIL',
// };
// export const STATE_REQUEST_VOTE = {
//     type:'REQUEST_VOTE',
// };
// export const STATE_REQUEST_NEW_TALK = {
//     type:'REQUEST_NEW_TALK',
// };
// export const STATE_DEFAULT = STATE_SHOW_MAIN_LIST;

export const STATE_TYPE_NORMAL_VOTE = 'STATE_TYPE_NORMAL_VOTE';
export const STATE_TYPE_REQUEST_VOTE_FETCHING = 'STATE_TYPE_REQUEST_VOTE_FETCHING';
export const STATE_TYPE_REQUEST_VOTE_SUCCESS = 'STATE_TYPE_REQUEST_VOTE_SUCCESS';
export const STATE_TYPE_REQUEST_VOTE_ERROR = 'STATE_TYPE_REQUEST_VOTE_ERROR';

const reducer = function(nowState={type:STATE_TYPE_NORMAL_VOTE}, nextAction){
    
    switch(nextAction.type){
        case STATE_TYPE_NORMAL_VOTE:
            if(STATE_TYPE_REQUEST_VOTE_SUCCESS == nowState.type || STATE_TYPE_REQUEST_VOTE_ERROR == nowState.type)
                return nextAction;
            return nowState;

        case STATE_TYPE_REQUEST_VOTE_FETCHING:
            if(STATE_TYPE_REQUEST_VOTE_FETCHING == nowState.type)
                return nowState;
            return nextAction;

        case STATE_TYPE_REQUEST_VOTE_SUCCESS:
        case STATE_TYPE_REQUEST_VOTE_ERROR:
            if(STATE_TYPE_REQUEST_VOTE_FETCHING == nowState.type)
                return nextAction;
            return nowState;
            
        default: return nowState;
    }
}

const storesLibrary = {};
export const createVoteStore = function(name){
    let store = createStore(reducer);
    if(!!name)storesLibrary[name] = store;
    return store;
};

export const getVoteStore = function(name){
    return storesLibrary[name];
};