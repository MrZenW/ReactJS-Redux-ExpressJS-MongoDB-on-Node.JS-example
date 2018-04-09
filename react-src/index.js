"use strict"

import React from 'react';
import { render } from 'react-dom';
import { createPageStore, STATE_TYPE_PAGE_TALK_LIST, STATE_TYPE_PAGE_EDITOR, STATE_TYPE_PAGE_DETAIL } from './state_machine/page.state_store';

import Button from 'material-ui/Button';
import VideogameAsset from 'material-ui-icons/VideogameAsset';

import TalkList from './component/talk_list.component';
import NewTalkEditor from './component/new_talk_editor.component';
import TalkDetail from './component/talk_detail.component';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state.talkList = <TalkList />;
        this.state.talkEditor = <NewTalkEditor />;
        this.state.talkDetail = <TalkDetail />;
        this.state.nowPage = this.state.talkList;
        
        this.subscribeForStateStore = this.subscribeForStateStore.bind(this);
        this._stateStore = createPageStore('main_page');
        this.unsubscribeFunction = this._stateStore.subscribe(this.subscribeForStateStore);
    }
    subscribeForStateStore(){
        let stateType = this._stateStore.getState();
        switch(stateType.type){
            case STATE_TYPE_PAGE_TALK_LIST:
                this.state.nowPage = this.state.talkList;
                break;
            case STATE_TYPE_PAGE_EDITOR:
                this.state.nowPage = this.state.talkEditor;
                break;
            case STATE_TYPE_PAGE_DETAIL:
                this.state.nowPage = this.state.talkDetail;
                break;
        }
        this.setState(this.state);
    }
    componentWillMount(){
        this._stateStore.dispatch({type:STATE_TYPE_PAGE_DETAIL});
    }
    render(){
        // return this.talkList;

        return this.state.nowPage;
    };
}
render(<App />, document.querySelector('#main'));

