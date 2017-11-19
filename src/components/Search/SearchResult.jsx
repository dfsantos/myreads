import React from 'react';
import PropTypes from 'prop-types';

import Book from '../Book';

const propTypes = {
  searchQuery: PropTypes.string.isRequired,
  books: PropTypes.array,
  onCategorizeBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

function SearchResult({ searchQuery, books, onCategorizeBook }) {
  const emptyResult = searchQuery.length > 0 && books.length === 0;
  return (
    <div className="search-books-results">
      {emptyResult && (
        <div className="empty-search-result">
          <span>Your search did not match any books.</span>
        </div>
      )}
      {!emptyResult && (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  title={book.title}
                  subtitle={book.subtitle}
                  coverLink={book.imageLinks.thumbnail}
                  authors={book.authors}
                  description={book.description}
                  onChangeBookCategory={onCategorizeBook(book)}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
