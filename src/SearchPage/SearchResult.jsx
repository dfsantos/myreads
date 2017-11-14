import React from 'react';
import PropTypes from 'prop-types';

import Book from '../common/Book';

const propTypes = {
  books: PropTypes.array,
  onCategorizeBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

function SearchResult({ books, onCategorizeBook }) {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book title={book.title} onChangeBookCategory={onCategorizeBook(book)} />
          </li>
        ))}
      </ol>
    </div>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
