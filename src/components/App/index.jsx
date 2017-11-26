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

const mergeUserAndSearchBooks = (userBooks, searchBooks) => {
  return searchBooks.map((searchBook, index) => {
    userBooks.forEach(userBook => {
      if (searchBook.id === userBook.id) searchBook.shelf = userBook.shelf;
    });
    return searchBook;
  });
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
        BooksAPI.update(book, book.shelf);
        return newState;
      });
    };
  }

  async onSearchBooks(searchQuery) {
    let searchResult = [];
    if (searchQuery.length > 0) {
      const result = await BooksAPI.search(searchQuery, 20);
      searchResult = result.error ? [] : mergeUserAndSearchBooks(this.state.books, result);
    }
    return searchResult;
  }

  handleToggleSideBar() {
    this.setState(state => ({ isSideBarOpen: !state.isSideBarOpen }));
  }

  render() {
    const { isSideBarOpen } = this.state;
    return (
      <div className="App">
        <AppBar title="BookFlix" onLeftIconButtonTouchTap={this.handleToggleSideBar} />
        <SideBar open={isSideBarOpen} onClose={this.handleToggleSideBar} />
        <Route
          exact
          path="/"
          render={() => {
            const { books, shelfConfig } = this.state;
            return (
              <Shelves
                books={books}
                configuration={shelfConfig}
                onCategorizeBook={this.onCategorizeBook}
              />
            );
          }}
        />
        <Route
          path="/search"
          render={() => {
            const { searchSuggestions } = this.state;
            return (
              <Search
                searchSuggestions={searchSuggestions}
                onCategorizeBook={this.onCategorizeBook}
                onSearchBooks={this.onSearchBooks}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
