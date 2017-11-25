import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import SideBar from '../SideBar';
import Shelves from '../Shelves';
import Search from '../Search';

import * as BooksAPI from '../../api/BooksAPI';
import searchSuggestions from '../../config/suggestion.config.json';
import shelfConfig from '../../config/shelf.config.json';

const initialState = {
  books: [],
  isSideBarOpen: false,
  shelfConfig,
  searchSuggestions,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem('state')) || initialState;
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
    this.handleToggleSideBar = this.handleToggleSideBar.bind(this);
    this.onSearchBooks = this.onSearchBooks.bind(this);
  }

  onCategorizeBook(book) {
    return shelf => {
      this.setState(state => {
        const books = state.books
          .filter(it => it.id !== book.id)
          .concat(Object.assign(book, { shelf }));
        const newState = Object.assign(state, { books });
        localStorage.setItem('state', JSON.stringify(state));
        return newState;
      });
    };
  }

  async onSearchBooks(searchQuery) {
    let searchResult = [];
    if (searchQuery.length > 0) {
      const result = await BooksAPI.search(searchQuery, 20);
      searchResult = result.error ? [] : result;
    }
    return searchResult;
  }

  handleToggleSideBar() {
    this.setState(state => ({ isSideBarOpen: !state.isSideBarOpen }));
  }

  render() {
    const { books, isSideBarOpen, shelfConfig, searchSuggestions } = this.state;
    return (
      <div className="App">
        <AppBar title="BookFlix" onLeftIconButtonTouchTap={this.handleToggleSideBar} />
        <SideBar open={isSideBarOpen} onClose={this.handleToggleSideBar} />
        <Route
          exact
          path="/"
          render={() => (
            <Shelves
              books={books}
              configuration={shelfConfig}
              onCategorizeBook={this.onCategorizeBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              searchSuggestions={searchSuggestions}
              onCategorizeBook={this.onCategorizeBook}
              onSearchBooks={this.onSearchBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
