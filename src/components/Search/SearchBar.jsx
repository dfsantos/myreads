import React from 'react';
import PropTypes from 'prop-types';

import ActionFlightTakeoff from 'material-ui/svg-icons/action/search';

import SearchInput from './SearchInput';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
};

function SearchBar({ onSearch }) {
  return (
    <div className="search-books-bar">
      <div style={{ padding: 12 }}>
        <ActionFlightTakeoff />
      </div>
      <SearchInput onChange={onSearch} />
    </div>
  );
}

SearchBar.propTypes = propTypes;

export default SearchBar;
