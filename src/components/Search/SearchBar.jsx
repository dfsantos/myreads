import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SearchInput from './SearchInput';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
};

function SearchBar({ onSearch }) {
  return (
    <div className="search-books-bar">
      <Link to="/" className="close-search">
        Close
      </Link>
      <SearchInput onChange={onSearch} />
    </div>
  );
}

SearchBar.propTypes = propTypes;

export default SearchBar;
