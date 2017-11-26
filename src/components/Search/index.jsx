import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import SearchSuggestion from './SearchSuggestion';

const propTypes = {
  onCategorizeBook: PropTypes.func.isRequired,
  onSearchBooks: PropTypes.func.isRequired,
  searchSuggestions: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  searchSuggestions: [],
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '', searchResult: [], isWaitingResponse: false };
    this.onSearch = this.onSearch.bind(this);
  }

  async onSearch(event) {
    this.setState({ isWaitingResponse: true });
    const searchQuery = event.target.value;
    const searchResult = await this.props.onSearchBooks(searchQuery);
    this.setState({ searchQuery, searchResult, isWaitingResponse: false });
  }

  render() {
    const { searchQuery, searchResult, isWaitingResponse } = this.state;
    const { searchSuggestions, onCategorizeBook } = this.props;
    return (
      <div className="search-books">
        <SearchBar onSearch={this.onSearch} />
        {isWaitingResponse && (
          <div className="loading">
            <CircularProgress size={80} thickness={5} color="#ff3d00" />
            <br />
            <span>Searching books...</span>
          </div>
        )}
        {!isWaitingResponse && (
          <div>
            <SearchSuggestion words={searchSuggestions} pause={searchQuery.length > 0} />
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

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
