import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import SearchSuggestion from './SearchSuggestion';

import * as BooksAPI from '../../api/BooksAPI';

import words from '../../config/suggestion.config.json';

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
    return category => {
      this.props.onCategorizeBook(Object.assign(book, { category }));
    };
  }

  render() {
    const { searchQuery, searchResult } = this.state;
    const { onCategorizeBook, onSearch } = this;
    return (
      <div className="search-books">
        <SearchBar onSearch={onSearch} />
        <SearchSuggestion words={words} pause={searchQuery.length > 0} />
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
