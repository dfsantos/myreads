import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  books: PropTypes.array,
};

const defaultProps = {
  books: [],
};

function SearchResult({ books }) {
  return (
    <div className="search-books-results">
      <ol className="books-grid">{books.map(_ => <li key={_.id}>{_.title}</li>)}</ol>
    </div>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
