import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import SearchSuggestion from './SearchSuggestion';

import words from '../../config/suggestion.config.json';

const propTypes = {
  onCategorizeBook: PropTypes.func.isRequired,
};

const CircularProgressExampleSimple = () => (
  <div className="loading">
    <CircularProgress size={80} thickness={5} color="#ff3d00" />
  </div>
);

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '', searchResult: [] };
    this.onSearch = this.onSearch.bind(this);
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
  }

  async onSearch(event) {
    this.setState({ isWaitingResponse: true });
    const searchQuery = event.target.value;
    let searchResult = [];

    if (searchQuery.length > 0) {
      const result = await this.props.onSearch(searchQuery);
      searchResult = result.error ? [] : result;
    }

    this.setState({ searchQuery, searchResult, isWaitingResponse: false });
  }

  onCategorizeBook(book) {
    return shelf => this.props.onCategorizeBook(book, shelf);
  }

  render() {
    const { searchQuery, searchResult, isWaitingResponse } = this.state;
    const { onCategorizeBook, onSearch } = this;
    return (
      <div className="search-books">
        <SearchBar onSearch={onSearch} />
        {isWaitingResponse && <CircularProgressExampleSimple />}
        {!isWaitingResponse && (
          <div>
            <SearchSuggestion words={words} pause={searchQuery.length > 0} />
            <SearchResult
              searchQuery={searchQuery}
              books={searchResult}
              onCategorizeBook={onCategorizeBook}
            />
          </div>
        )}
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;

export default SearchPage;
