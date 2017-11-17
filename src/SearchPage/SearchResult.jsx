import React from 'react';
import PropTypes from 'prop-types';

import BookCard from './BookCard';

const propTypes = {
  searchQuery: PropTypes.string.isRequired,
  books: PropTypes.array,
  onCategorizeBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

function SearchResult({ searchQuery, books, onCategorizeBook }) {
  const hasSearch = searchQuery.length > 0 && books.length === 0;
  return (
    <div className="search-books-results">
      {hasSearch && (
        <div>
          <span>Your search did not match any books.</span>
        </div>
      )}
      <ul style={{ listStyle: 'none' }}>
        {books.map(book => (
          <li key={book.id} style={{ borderBottom: '1px solid #CFD8DC', padding: 10 }}>
            <BookCard book={book} onCategorizeBook={onCategorizeBook(book)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
