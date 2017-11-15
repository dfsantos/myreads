import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import BookshelfPage from './BookshelfPage';
import SearchPage from './SearchPage';
import './App.css';

const persistState = state => window.localStorage.setItem('state', JSON.stringify(state));
const loadState = () => JSON.parse(window.localStorage.getItem('state')) || { books: [] };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = loadState();
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
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

  render() {
    return (
      <div className="App">
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
