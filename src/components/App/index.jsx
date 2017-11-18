import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import SideBar from '../SideBar';
import BookshelfPage from '../Bookshelf';
import SearchPage from '../Search';

const persistState = state => window.localStorage.setItem('state', JSON.stringify(state));
const loadState = () =>
  JSON.parse(window.localStorage.getItem('state')) || { books: [], open: false };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
    this.handleToggleSideBar = this.handleToggleSideBar.bind(this);
  }

  onCategorizeBook(book) {
    this.setState(state => {
      const books = state.books
        .filter(it => it.id !== book.id)
        .concat(book.category !== 'none' ? book : []);

      const newState = { books };
      persistState(newState);
      return newState;
    });
  }

  handleToggleSideBar() {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    const { open } = this.state;
    return (
      <div className="App">
        <AppBar title="My Reads" onLeftIconButtonTouchTap={this.handleToggleSideBar} />
        <SideBar open={open} onClose={this.handleToggleSideBar} />
        <Route
          exact
          path="/"
          render={() => (
            <BookshelfPage books={this.state.books} onCategorizeBook={this.onCategorizeBook} />
          )}
        />
        <Route
          path="/search"
          render={() => <SearchPage onCategorizeBook={this.onCategorizeBook} />}
        />
      </div>
    );
  }
}

export default App;
