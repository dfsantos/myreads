import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import * as BooksAPI from '../BooksAPI';

const EVENT_WRAPPER = { target: { value: '' } };

const propTypes = {
  onCategorizeBook: PropTypes.func.isRequired,
};

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: [],
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
  }

  async onSearch(event = EVENT_WRAPPER) {
    const searchQuery = event.target.value;
    const searchResult = await BooksAPI.search(searchQuery, 10);
    this.setState({ searchResult });
  }

  onCategorizeBook(book) {
    return category => this.props.onCategorizeBook(Object.assign(book, { category }));
  }

  render() {
    const { searchResult } = this.state;
    const { onCategorizeBook } = this.props;
    const { onSearch } = this;
    return (
      <div className="search-books">
        <SearchBar onSearch={onSearch} />
        <SearchResult books={searchResult} onCategorizeBook={onCategorizeBook} />
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;

export default SearchPage;
