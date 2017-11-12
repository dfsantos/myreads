import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
};

function SearchBar({ onSearch }) {
  return (
    <div className="search-books-bar">
      <a href="/" className="close-search">
        Close
      </a>
      <SearchInput onChange={onSearch} />
    </div>
  );
}

SearchBar.propTypes = propTypes;

export default SearchBar;
