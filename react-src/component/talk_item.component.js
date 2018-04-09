"sue strict"

import React from 'react';
import ReactDOM from 'react-dom';
import {
    createVoteStore,
    STATE_TYPE_NORMAL_VOTE,
    STATE_TYPE_REQUEST_VOTE_ERROR,
    STATE_TYPE_REQUEST_VOTE_FETCHING,
    STATE_TYPE_REQUEST_VOTE_SUCCESS,
} from '../state_machine/vote.state_store';

import {
    getListTalkStore,
    STATE_TYPE_NORMAL_LIST_TALK,
    STATE_TYPE_REQUEST_LIST_TALK_FETCHING,
} from '../state_machine/list_talk.state_store';

import { getPageStore, STATE_TYPE_PAGE_DETAIL } from '../state_machine/page.state_store';


import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction} from 'material-ui/List';

import StarIcon from 'material-ui-icons/Star';
import ThumbUpIcon from 'material-ui-icons/ThumbUp'

import IconButton from 'material-ui/IconButton';
import { STATE_TYPE_NORMAL_TALK_DETAIL } from '../state_machine/talk_detail.state_store';

export default class TalkItem extends React.Component{

    constructor(props){
        super(props);
        this.thumbUpOnClick = this.thumbUpOnClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.subscribeForStateStore = this.subscribeForStateStore.bind(this);

        this._voteStateStore = createVoteStore();
		this._voteUnsubscribeFunction = this._voteStateStore.subscribe(this.subscribeForStateStore);
    }

    subscribeForStateStore(){
        let nowState = this._voteStateStore.getState();
        console.log(nowState,'talk_item.component')
        if(STATE_TYPE_REQUEST_VOTE_SUCCESS == nowState.type){ // if vote success, refresh the main talk list
            let listStore = getListTalkStore('main_list');
            if(!!listStore){
                listStore.dispatch({type:STATE_TYPE_REQUEST_LIST_TALK_FETCHING});
            }
        }
    }
    thumbUpOnClick(e){
        console.log("thumbUpOnClick");
        let store = this._voteStateStore;
        store.dispatch({type:STATE_TYPE_REQUEST_VOTE_FETCHING});
        // $.get('/api/talk_vote/'+this.props.talkId,function(data){
        $.get('/api/vote/'+this.props.talkId,function(data){
            store.dispatch({type:STATE_TYPE_REQUEST_VOTE_SUCCESS,data:data});
        })
        .fail(function(err){
            store.dispatch({type:STATE_TYPE_REQUEST_VOTE_ERROR,error:err});
        });
        e.stopPropagation();
    }
    onClick(){
        getPageStore('main_page').dispatch({type:STATE_TYPE_PAGE_DETAIL,talkId:this.props.talkId})

    }
    render(){

        let listItem = <ListItemText inset primary={this.props.primary} />;
        if('secondary' in this.props)listItem = <ListItemText inset primary={this.props.primary} secondary={this.props.secondary} />;
        return <div>

                <ListItem button onClick={this.onClick}>
                    <ListItemIcon>
                        <IconButton  aria-label="ThumbUp" onClick={this.thumbUpOnClick}>
                            <ThumbUpIcon />
                        </IconButton>
                    </ListItemIcon>
                    {listItem}
                </ListItem>
            </div>
    }
}