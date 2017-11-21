import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import SideBar from '../SideBar';
import Shelves from '../Shelves';
import Search from '../Search';

import * as State from '../../utils/state';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = State.loadState();
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
    this.handleToggleSideBar = this.handleToggleSideBar.bind(this);
  }

  onCategorizeBook(book) {
    this.setState(state => {
      const books = state.books.filter(it => it.id !== book.id).concat(book);
      const newState = Object.assign(state, { books });
      State.persist(newState);
      return newState;
    });
  }

  handleToggleSideBar() {
    this.setState(state => ({ isSideBarOpen: !state.isSideBarOpen }));
  }

  render() {
    const { books, isSideBarOpen } = this.state;
    return (
      <div className="App">
        <AppBar title="BookFlix" onLeftIconButtonTouchTap={this.handleToggleSideBar} />
        <SideBar open={isSideBarOpen} onClose={this.handleToggleSideBar} />
        <Route
          exact
          path="/"
          render={() => <Shelves books={books} onCategorizeBook={this.onCategorizeBook} />}
        />
        <Route path="/search" render={() => <Search onCategorizeBook={this.onCategorizeBook} />} />
      </div>
    );
  }
}

export default App;
