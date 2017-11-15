import React from 'react';
import PropTypes from 'prop-types';

import Book from '../common/Book';

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
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book
              title={book.title}
              coverLink={book.imageLinks.thumbnail}
              onChangeBookCategory={onCategorizeBook(book)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
