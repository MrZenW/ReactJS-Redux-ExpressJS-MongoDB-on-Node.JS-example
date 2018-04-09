"use strict"

import {createStore} from 'redux'

export const STATE_TYPE_PAGE_TALK_LIST = 'STATE_TYPE_PAGE_TALK_LIST';
export const STATE_TYPE_PAGE_EDITOR = 'STATE_TYPE_PAGE_EDITOR';
export const STATE_TYPE_PAGE_DETAIL = 'STATE_TYPE_PAGE_DETAIL';


const reducer = function(nowState={type:STATE_TYPE_PAGE_TALK_LIST}, nextAction){
    
    switch(nextAction.type){
            
        default: return nextAction;
    }
}

const storesLibrary = {};
export const createPageStore = function(name){
    let store = createStore(reducer);
    if(!!name)storesLibrary[name] = store;
    return store;
};


export const getPageStore = function(name){
    return storesLibrary[name];
};