import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func.isRequired,
};

function SearchInput({ onChange }) {
  return (
    <div className="search-books-input-wrapper">
      <input type="text" placeholder="Search by title or author" onChange={onChange} />
    </div>
  );
}

SearchInput.propTypes = propTypes;

export default SearchInput;
