import React from 'react';
import PropTypes from 'prop-types';

import Book from '../common/Book';

const propTypes = {
  books: PropTypes.array,
};

const defaultProps = {
  books: [],
};

const toBookItem = book => (
  <li key={book.id}>
    <Book title={book.title} />
  </li>
);

function SearchResult({ books }) {
  return (
    <div className="search-books-results">
      <ol className="books-grid">{books.map(toBookItem)}</ol>
    </div>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
