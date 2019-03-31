import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamList from '../streams/stream-list/streamList';
import StreamCreate from '../streams/stream-create/streamCreate';
import StreamDelete from '../streams/stream-delete/streamDelete';
import StreamShow from '../streams/stream-show/streamShow';
import StreamEdit from '../streams/stream-edit/streamEdit';
import Header from '../header/header';
import history from '../../history';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header/>
            <Switch>
              <Route path="/" exact component={StreamList}></Route>
              <Route path="/streams/new" exact component={StreamCreate}></Route>
              <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
              <Route path="/streams/delete/:id" exact component={StreamDelete}></Route>
              <Route path="/streams/show/:id/:streamName" exact component={StreamShow}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;