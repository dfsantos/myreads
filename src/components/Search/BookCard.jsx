import React from 'react';
import PropTypes from 'prop-types';

import Book from '../Book';

const propTypes = {
  book: PropTypes.object.isRequired,
  onCategorizeBook: PropTypes.func.isRequired,
};

function BookCard({ book, onCategorizeBook }) {
  return (
    <div className="book-card-wrapper">
      <div className="book-column">
        <Book
          title={book.title}
          authors={book.authors}
          coverLink={book.imageLinks.thumbnail}
          onChangeBookCategory={onCategorizeBook}
        />
        {book.category === 'currentlyReading' && <span className="reading">Currently Reading</span>}
        {book.category === 'wantToRead' && <span className="want-to-read">Want To Read</span>}
        {book.category === 'read' && <span className="read">Read</span>}
      </div>
      <div className="info-column">
        <h3>{book.title}</h3>
        <h5>{book.subtitle}</h5>
        <p>{book.description}</p>
      </div>
    </div>
  );
}

BookCard.propTypes = propTypes;

export default BookCard;
