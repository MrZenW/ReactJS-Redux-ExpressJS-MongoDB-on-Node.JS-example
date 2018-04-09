"use strict"

import React from 'react';
import ReactDOM,{render} from 'react-dom';
import {
	createListTalkStore,
	STATE_TYPE_NORMAL_LIST_TALK,
	STATE_TYPE_REQUEST_LIST_TALK_ERROR,
	STATE_TYPE_REQUEST_LIST_TALK_FETCHING,
	STATE_TYPE_REQUEST_LIST_TALK_SUCCESS,
} from '../state_machine/list_talk.state_store'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import StarIcon from 'material-ui-icons/Star';
import TalkItem from './talk_item.component';
import Divider from 'material-ui/Divider';

import Button from 'material-ui/Button';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import AddIcon from 'material-ui-icons/Add';

import {CircularProgress} from 'material-ui/Progress';
import { getPageStore, STATE_TYPE_PAGE_EDITOR } from '../state_machine/page.state_store';

const styles = theme => ({
	root: {
		width: '100%',
	//   maxWidth: 360,
		// padding: '10px',
		backgroundColor: theme.palette.background.paper,
	},
});

class InsetList extends React.Component{
	// const { classes } = props;
	constructor(props){
		console.log('list constructor')
		super(props);
		this.state = {listItems:[]};
		this.createChildrenComponent = this.createChildrenComponent.bind(this);
		this.newTalkOnClick = this.newTalkOnClick.bind(this);
		this.subscribeForStateStore = this.subscribeForStateStore.bind(this);
		this.fetchListData = this.fetchListData.bind(this);

		this._stateStore = createListTalkStore('main_list');
		this._unsubscribeFunction = this._stateStore.subscribe(this.subscribeForStateStore);
		

	}
	subscribeForStateStore(){
		console.log('talk_list subscribeForStateStore');
		let nowState = this._stateStore.getState();
		switch(nowState.type){
			case STATE_TYPE_REQUEST_LIST_TALK_FETCHING:
				this.fetchListData();
				break;
			case STATE_TYPE_REQUEST_LIST_TALK_SUCCESS:
				this.createChildrenComponent();
				break;
			
			case STATE_TYPE_REQUEST_LIST_TALK_ERROR:
				break;
		}
		
		this.setState(Object.assign(this.state,{listItems:this.listItemsComponents}));// update the component

	}
	componentWillUnmount(){

		console.log("componentWillUnmount");
		// this._unsubscribeFunction();
	}
	getInitialState(){
		return {listItems:[]};
	}
	componentWillMount(){
		console.log("componentWillMount");
		this._stateStore.dispatch({type:STATE_TYPE_REQUEST_LIST_TALK_FETCHING});
		
	}
	fetchListData(){
		let self = this;
		$.get('/api/talk_list',function(data){


			self._stateStore.dispatch({type:STATE_TYPE_REQUEST_LIST_TALK_SUCCESS,data:data});	
				

		}).fail(function(error){

			self._stateStore.dispatch({type:STATE_TYPE_REQUEST_LIST_TALK_ERROR,error:error});
			
		});
		console.log('fetchListData');
		// this.setState(Object.assign(this.state,{listItems:
		// 	[<div><CircularProgress size={24}/></div>]
		// }));
	}

	createChildrenComponent(){
		console.log('createChildrenComponent');

		let stateNow = this._stateStore.getState();

		let stateData = stateNow.data||[];

		let listItems = [];
		
		for(let row of stateData){
			listItems.push(<TalkItem primary={row.title} secondary={row.voteNumber+' points. by '+row.username} talkId={row._id}/>);
			listItems.push(<Divider/>);
		}
		listItems.pop();
		this.listItemsComponents = listItems;
		
		// this.setState(Object.assign(this.state,{listItems:listItems}));
	}

	newTalkOnClick(){
		//should do main store here
		getPageStore('main_page').dispatch({type:STATE_TYPE_PAGE_EDITOR});
	}

	render(){
		console.log('talk_list render')
		return <div className={this.props.classes.root}>
					<AppBar position="static" color="default" style={{marginBottom:'10px'}}>
						<Toolbar>

							<Typography variant="title" color="inherit" >
							Talk list
							</Typography>
						</Toolbar>
					</AppBar>
					{this._stateStore.getState().type==STATE_TYPE_REQUEST_LIST_TALK_FETCHING && <CircularProgress size={50} thickness={7}/>}
					<div>
						<Button variant="fab" color="secondary" onClick={this.newTalkOnClick}>
							<AddIcon />
						</Button>
					</div>
					<List>
					{this.state.listItems}
					</List>
					
				</div>;
	}
}

InsetList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);