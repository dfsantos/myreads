import React from 'react';
import PropTypes from 'prop-types';

import Book from '../common/Book';

const propTypes = {
  books: PropTypes.array,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onCategorizeBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

const byCategory = category => book => book.category === category;

function Bookshelf({ name, category, books, onCategorizeBook }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.filter(byCategory(category)).map(book => (
            <li key={book.id}>
              <Book
                title={book.title}
                coverLink={book.imageLinks.thumbnail}
                authors={book.authors}
                onChangeBookCategory={onCategorizeBook(book)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = propTypes;
Bookshelf.defaultProps = defaultProps;

export default Bookshelf;
