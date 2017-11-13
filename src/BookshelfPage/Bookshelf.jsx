import React from 'react';
import PropTypes from 'prop-types';

import Book from '../common/Book';

const propTypes = {
  books: PropTypes.array,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const defaultProps = {
  books: [],
};

const byStatus = type => book => book.status === type;

const toBookItem = book => (
  <li key={book.id}>
    <Book title={book.title} authors={book.authors} />
  </li>
);

function Bookshelf({ name, type, books }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{books.filter(byStatus(type)).map(toBookItem)}</ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = propTypes;
Bookshelf.defaultProps = defaultProps;

export default Bookshelf;
