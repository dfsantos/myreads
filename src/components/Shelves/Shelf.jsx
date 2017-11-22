import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import Book from '../Book';

const propTypes = {
  books: PropTypes.array,
  name: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  onCategorizeBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

const byShelf = shelf => book => book.shelf === shelf;

function Shelf({ name, shelf, books, onCategorizeBook }) {
  const shelfBooks = books.filter(byShelf(shelf));
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
          shelfBooks.map(book => {
            const { thumbnail } = book.imageLinks || { thumbnail: '' };
            return (
              <Book
                key={book.id}
                title={book.title}
                subtitle={book.subtitle}
                coverLink={thumbnail}
                authors={book.authors}
                description={book.description}
                shelf={book.shelf}
                onChangeBookShelf={onCategorizeBook(book)}
              />
            );
          })}
      </div>
    </Paper>
  );
}

Shelf.propTypes = propTypes;
Shelf.defaultProps = defaultProps;

export default Shelf;
