import React from 'react';
import PropTypes from 'prop-types';

import { Debounce } from 'react-throttle';

const propTypes = {
  onChange: PropTypes.func.isRequired,
};

function SearchInput({ onChange }) {
  return (
    <div className="search-books-input-wrapper">
      <Debounce time="500" handler="onChange">
        <input type="text" placeholder="Search by title or author" onChange={onChange} />
      </Debounce>
    </div>
  );
}

SearchInput.propTypes = propTypes;

export default SearchInput;
