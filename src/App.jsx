import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import BookshelfPage from './BookshelfPage';
import SearchPage from './SearchPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };

    this.onCategorizeBook = this.onCategorizeBook.bind(this);
  }

  onCategorizeBook(book) {
    this.setState(state => ({ books: state.books.filter(_ => _.id !== book.id).concat(book) }));
  }

  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => <BookshelfPage books={books} onCategorizeBook={this.onCategorizeBook} />}
        />
        <Route
          path="/add-book"
          render={() => <SearchPage onCategorizeBook={this.onCategorizeBook} />}
        />
      </div>
    );
  }
}

export default App;
