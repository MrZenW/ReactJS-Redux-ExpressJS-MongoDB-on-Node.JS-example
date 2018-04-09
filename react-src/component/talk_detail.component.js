"use strict"

import React from 'react';
import ReactDOM from 'react-dom';
import { createTalkDetailStore, STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING, STATE_TYPE_NORMAL_TALK_DETAIL, STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS, STATE_TYPE_REQUEST_TALK_DETAIL_ERROR } from '../state_machine/talk_detail.state_store';
import { createNewTalkStore, STATE_TYPE_REQUEST_NEW_TALK_FETCHING, STATE_TYPE_REQUEST_NEW_TALK_SUCCESS, STATE_TYPE_REQUEST_NEW_TALK_ERROR,} from '../state_machine/new_talk.state_store';
import { getPageStore, STATE_TYPE_PAGE_TALK_LIST, STATE_TYPE_PAGE_DETAIL,} from '../state_machine/page.state_store';


import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import AccountCircle from 'material-ui-icons/AccountCircle';

import {CircularProgress} from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

export default class TalkDetail extends React.Component{
    constructor(props){
        super(props);
        this.backButtonOnClick = this.backButtonOnClick.bind(this);

        this.subscribeForStateStore = this.subscribeForStateStore.bind(this);

		this._stateStore = createTalkDetailStore();
		this._unsubscribeFunction = this._stateStore.subscribe(this.subscribeForStateStore);

        this.state = {};
        this.state.talkData = {};

        this._stateStore.dispatch({type:STATE_TYPE_NORMAL_TALK_DETAIL});
    }
    subscribeForStateStore(){
        
        let nowState = this._stateStore.getState();
        console.log('talk_detail subscribeForStateStore',nowState);
        switch(nowState.type){
            case STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING:

                break;
            case STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS:
                this.state.talkData = nowState.data;
                break;
            case STATE_TYPE_REQUEST_TALK_DETAIL_ERROR:
                break;
        }
        this.setState(this.state);
    }
    backButtonOnClick(){
        let pageStore = getPageStore('main_page');
        pageStore.dispatch({type:STATE_TYPE_PAGE_TALK_LIST});
    }
    componentDidMount(){
        let self = this;
        let pageStore = getPageStore('main_page');
        let pageStoreNowState = pageStore.getState();
        
        
        if(pageStoreNowState.type == STATE_TYPE_PAGE_DETAIL){
            let talkId = pageStoreNowState.talkId;
            self._stateStore.dispatch({type:STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING});
            $.get('/api/get_detail/'+talkId,function(data){
                self._stateStore.dispatch({type:STATE_TYPE_REQUEST_TALK_DETAIL_SUCCESS,data:data});
            }).fail(function(e){
                self._stateStore.dispatch({type:STATE_TYPE_REQUEST_TALK_DETAIL_ERROR,error:e});
            });
        }
        
    }
    render(){
        return <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton  color="inherit" aria-label="Menu" onClick={this.backButtonOnClick}>
                        <ChevronLeft />
                    </IconButton>
                    <Typography variant="title" color="inherit" >
                    Talks detail
                    </Typography>
            </Toolbar>
          </AppBar>
            {this._stateStore.getState().type==STATE_TYPE_REQUEST_TALK_DETAIL_FETCHING && <CircularProgress size={50} thickness={7}/>}
            <div style={{marginTop:'10px'}}>
            <Paper elevation={5} style={{padding:'10px'}}>
                <Typography variant="headline" component="h3">
                Title: {this.state.talkData.title}
                </Typography>
                <Typography component="p">
                {this.state.talkData.voteNumber+' points by '+this.state.talkData.username}
                </Typography>
                <Divider />
                <Typography component="p">
                Description: {this.state.talkData.description}
                </Typography>
            </Paper>
            </div>
        </div>;
    }
}
