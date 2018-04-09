"use strict"

import React from 'react';
import ReactDOM from 'react-dom';
import { createNewTalkStore, STATE_TYPE_REQUEST_NEW_TALK_FETCHING, STATE_TYPE_REQUEST_NEW_TALK_SUCCESS, STATE_TYPE_REQUEST_NEW_TALK_ERROR,} from '../state_machine/new_talk.state_store';
import { getPageStore, STATE_TYPE_PAGE_TALK_LIST, STATE_TYPE_PAGE_DETAIL,} from '../state_machine/page.state_store';


import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import ThumbUpIcon from 'material-ui-icons/ThumbUp'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import AccountCircle from 'material-ui-icons/AccountCircle';

import {CircularProgress} from 'material-ui/Progress';

export default class NewTalkEditor extends React.Component{
    constructor(props){
        super(props);
        this.backButtonOnClick = this.backButtonOnClick.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);

        this.submit = this.submit.bind(this);

        this.subscribeForStateStore = this.subscribeForStateStore.bind(this);

		this._stateStore = createNewTalkStore('new_talk_editor');
		this._unsubscribeFunction = this._stateStore.subscribe(this.subscribeForStateStore);

        this.state = {};
    }
    subscribeForStateStore(){
        console.log('new_talk_editor subscribeForStateStore');
        let nowState = this._stateStore.getState();
        switch(nowState.type){
            case STATE_TYPE_REQUEST_NEW_TALK_SUCCESS:
                getPageStore('main_page').dispatch({type:STATE_TYPE_PAGE_DETAIL,talkId:nowState.data._id});
                break;
        }
        this.setState(this.state);
    }
    backButtonOnClick(){
        let pageStore = getPageStore('main_page');
        pageStore.dispatch({type:STATE_TYPE_PAGE_TALK_LIST});
    }
    handleChangeUsername(e){
        this.state.formUsername = e.target.value;
    }
    handleChangeTitle(e){
        this.state.formTitle = e.target.value;
    }
    handleChangeDescription(e){
        this.state.formDescription = e.target.value;
    }
    submit(){
        let self = this;
        this._stateStore.dispatch({type:STATE_TYPE_REQUEST_NEW_TALK_FETCHING});
        let reqData = {title:this.state.formTitle,description:this.state.formDescription,username:this.state.formUsername};
        $.post('/api/new_talk',reqData,function(data){
            console.log(data,'submit success');
            self._stateStore.dispatch({type:STATE_TYPE_REQUEST_NEW_TALK_SUCCESS,data:data});
        },'json').fail(function(err){
            console.log(err);
            self._stateStore.dispatch({type:STATE_TYPE_REQUEST_NEW_TALK_ERROR,error:err});
        });

    }
    render(){
        return <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton  color="inherit" aria-label="Menu" onClick={this.backButtonOnClick}>
                        <ChevronLeft />
                    </IconButton>
                    <Typography variant="title" color="inherit" >
                    Talks list
                    </Typography>
            </Toolbar>
          </AppBar>
            {this._stateStore.getState().type==STATE_TYPE_REQUEST_NEW_TALK_FETCHING && <CircularProgress size={50} thickness={7}/>}
            <form className={this.props.className} noValidate autoComplete="off">
            
            <TextField
                fullWidth
                required
                id="username"
                label="User name:"
                // defaultValue="Hello World"
                // className={classes.textField}
                margin="normal"
                onChange={this.handleChangeUsername}
            />
            <TextField
                fullWidth
                required
                id="title"
                label="Title:"
                // defaultValue="Hello World"
                // className={classes.textField}
                margin="normal"
                onChange={this.handleChangeTitle}
            />
            <TextField
                fullWidth
                required 
                multiline="true"
                id="description"
                label="Description (multiline)"
                margin="normal"
                onChange={this.handleChangeDescription}
            />
            <Button onClick={this.submit} variant="raised" color="primary">
            Send<SendIcon>send</SendIcon>
            </Button>
        </form>
        </div>;
    }
}
