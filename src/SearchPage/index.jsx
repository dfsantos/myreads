import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import * as BooksAPI from '../BooksAPI';

const propTypes = {
  onCategorizeBook: PropTypes.func.isRequired,
};

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchResult: [],
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
  }

  async onSearch(event) {
    const searchQuery = event.target.value;
    if (searchQuery.length === 0) {
      this.setState({ searchQuery, searchResult: [] });
    } else {
      const result = await BooksAPI.search(searchQuery, 10);
      this.setState({ searchQuery, searchResult: result.error ? [] : result });
    }
  }

  onCategorizeBook(book) {
    return category => this.props.onCategorizeBook(Object.assign(book, { category }));
  }

  render() {
    const { searchQuery, searchResult } = this.state;
    const { onCategorizeBook, onSearch } = this;
    return (
      <div className="search-books">
        <SearchBar onSearch={onSearch} />
        <SearchResult
          searchQuery={searchQuery}
          books={searchResult}
          onCategorizeBook={onCategorizeBook}
        />
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;

export default SearchPage;
