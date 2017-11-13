import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import * as BooksAPI from '../BooksAPI';

const EVENT_WRAPPER = { target: { value: '' } };

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: [],
    };

    this.onSearch = this.onSearch.bind(this);
  }

  async onSearch(event = EVENT_WRAPPER) {
    const searchQuery = event.target.value;
    const searchResult = await BooksAPI.search(searchQuery, 10);
    this.setState({ searchResult });
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar onSearch={this.onSearch} />
        <SearchResult books={this.state.searchResult} />
      </div>
    );
  }
}

export default SearchPage;
