import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import Book from '../Book';

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

function Shelf({ name, category, books, onCategorizeBook }) {
  const shelfBooks = books.filter(byCategory(category));
  const isEmpty = shelfBooks.length === 0;
  return (
    <Paper className="shelf">
      <div className="shelf-title">
        <span>{name}</span>
      </div>
      <div className="shelf-content">
        {isEmpty && (
          <div className="empty-shelf-message">
            <span>This shelf is empty.</span>
          </div>
        )}
        {!isEmpty &&
          shelfBooks.map(book => (
            <Book
              key={book.id}
              title={book.title}
              subtitle={book.subtitle}
              coverLink={book.imageLinks.thumbnail}
              authors={book.authors}
              description={book.description}
              category={book.category}
              onChangeBookCategory={onCategorizeBook(book)}
            />
          ))}
      </div>
    </Paper>
  );
}

Shelf.propTypes = propTypes;
Shelf.defaultProps = defaultProps;

export default Shelf;
