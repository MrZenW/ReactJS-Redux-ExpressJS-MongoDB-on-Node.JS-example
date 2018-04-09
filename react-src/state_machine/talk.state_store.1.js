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

export const STATE_TYPE_SHOW_MAIN_LIST = 'STATE_TYPE_SHOW_MAIN_LIST';
export const STATE_TYPE_REQUEST_MAIN_LIST_FETCHING = 'STATE_TYPE_REQUEST_MAIN_LIST_FETCHING';
export const STATE_TYPE_REQUEST_MAIN_LIST_SUCCESS = 'STATE_TYPE_REQUEST_MAIN_LIST_SUCCESS';
export const STATE_TYPE_REQUEST_MAIN_LIST_ERROR = 'STATE_TYPE_REQUEST_MAIN_LIST_ERROR';

export const STATE_TYPE_SHOW_TALK_DETAIL = 'STATE_TYPE_SHOW_TALK_DETAIL';
export const STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING = 'STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING';
export const STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS = 'STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS';
export const STATE_TYPE_REQUEST_TALK_DETAIL_ERROR = 'STATE_TYPE_REQUEST_TALK_DETAIL_ERROR';

export const STATE_TYPE_REQUEST_VOTE_FETCHING = 'STATE_TYPE_REQUEST_VOTE_FETCHING';
export const STATE_TYPE_REQUEST_VOTE_SUCCESS = 'STATE_TYPE_REQUEST_VOTE_SUCCESS';
export const STATE_TYPE_REQUEST_VOTE_ERROR = 'STATE_TYPE_REQUEST_VOTE_ERROR';

export const STATE_TYPE_SHOW_EDIT_BOARD = 'STATE_TYPE_SHOW_EDIT_BOARD';
export const STATE_TYPE_REQUEST_NEW_TALK_FETCHING = 'STATE_TYPE_REQUEST_NEW_TALK_FETCHING';
export const STATE_TYPE_REQUEST_NEW_TALK_SUCCESS = 'STATE_TYPE_REQUEST_NEW_TALK_SUCCESS';
export const STATE_TYPE_REQUEST_NEW_TALK_ERROR = 'STATE_TYPE_REQUEST_NEW_TALK_ERROR';

export const STATE_TYPE_DEFAULT = STATE_TYPE_SHOW_MAIN_LIST;

const reducer = function(nowState={type:STATE_TYPE_DEFAULT}, nextAction){
    // switch(nowState.type){
    //     case STATE_SHOW_MAIN_LIST:

    //     default: return nowState;
    // }
    switch(nextAction.type){
        case STATE_TYPE_SHOW_MAIN_LIST:
            nextAction.scene = 'talk_list';
            return nextAction;

            case STATE_TYPE_REQUEST_MAIN_LIST_FETCHING:
                nextAction.scene = 'talk_list';
                if(STATE_TYPE_SHOW_MAIN_LIST != nowState.type)return nowState;
                return nextAction;

                case STATE_TYPE_REQUEST_MAIN_LIST_SUCCESS:
                case STATE_TYPE_REQUEST_MAIN_LIST_ERROR:
                    nextAction.scene = 'talk_list';
                    if(STATE_TYPE_REQUEST_MAIN_LIST_FETCHING != nowState.type)return nowState;
                    return nextAction;
                

        case STATE_TYPE_SHOW_TALK_DETAIL:
            nextAction.scene = 'talk_list';
            // if(STATE_TYPE_REQUEST_MAIN_LIST_SUCCESS != nowState.type)return nowState;
            return nextAction;

            case STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING:
                nextAction.scene = 'talk_list';
                if(STATE_TYPE_SHOW_TALK_DETAIL != nowState.type)return nowState;
                return nextAction;
                
                case STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS:
                case STATE_TYPE_REQUEST_TALK_DETAIL_ERROR:
                    nextAction.scene = 'talk_list';
                    if(STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING != nowState.type)return nowState;
                    return nextAction;


        case STATE_TYPE_REQUEST_VOTE_FETCHING: // async request to vote state
            nextAction.scene = 'talk_list';
            // if(STATE_TYPE_REQUEST_MAIN_LIST_SUCCESS != nowState.type)return nowState;
            return nextAction;

            case STATE_TYPE_REQUEST_VOTE_ERROR:
            case STATE_TYPE_REQUEST_VOTE_SUCCESS:
                nextAction.scene = 'talk_list';
                if(STATE_TYPE_REQUEST_VOTE_FETCHING != nowState.type)return nowState;
                return nextAction;


        case STATE_TYPE_SHOW_EDIT_BOARD:
            nextAction.scene = 'talk_editor';
            return nextAction;
            
            case STATE_TYPE_REQUEST_NEW_TALK_FETCHING: // async to request create a new talk state
                nextAction.scene = 'talk_editor';
                if(STATE_TYPE_SHOW_EDIT_BOARD != nowState.type)return nowState;
                return nextAction;

                case STATE_TYPE_REQUEST_NEW_TALK_ERROR:
                case STATE_TYPE_REQUEST_NEW_TALK_SUCCESS:
                    nextAction.scene = 'talk_editor';
                    if(STATE_TYPE_REQUEST_NEW_TALK_FETCHING != nowState.type)return nowState;
                    return nextAction;
            
        default: return nowState;
    }
}
export default createStore(reducer);
