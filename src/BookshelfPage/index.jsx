import React from 'react';
import PropTypes from 'prop-types';

import Bookshelf from './Bookshelf';

const propTypes = {
  books: PropTypes.array,
};

const defaultProps = {
  books: [],
};

function BookshelfPage({ books }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf name="Currently Reading" type="READING" books={books} />
          <Bookshelf name="Read" type="READ" books={books} />
          <Bookshelf name="Want to Read" type="TO_READ" books={books} />
        </div>
      </div>
      <div className="open-search">
        <a href="/">Add a book</a>
      </div>
    </div>
  );
}

BookshelfPage.propTypes = propTypes;
BookshelfPage.defaultProps = defaultProps;

export default BookshelfPage;
