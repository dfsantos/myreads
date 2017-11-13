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
  }
  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <Route exact path="/" render={() => <BookshelfPage books={books} />} />
        <Route path="/add-book" component={SearchPage} />
      </div>
    );
  }
}

export default App;
