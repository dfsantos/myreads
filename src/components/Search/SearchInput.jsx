import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Debounce } from 'react-throttle';

const propTypes = {
  onChange: PropTypes.func.isRequired,
};

function SearchInput({ onChange }) {
  return (
    <div className="search-books-input-wrapper">
      <Debounce time="500" handler="onChange">
        <TextField
          name="search-input"
          placeholder="Search by title or author"
          onChange={onChange}
          underlineShow={false}
          fullWidth
        />
      </Debounce>
    </div>
  );
}

SearchInput.propTypes = propTypes;

export default SearchInput;
