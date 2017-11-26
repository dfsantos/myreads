import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import Shelf from './Shelf';

const propTypes = {
  books: PropTypes.array,
  onCategorizeBook: PropTypes.func.isRequired,
  configuration: PropTypes.array.isRequired,
  isLoadingBooks: PropTypes.bool,
};

const defaultProps = {
  books: [],
  isLoadingBooks: false,
};

function Shelves({ books, configuration, onCategorizeBook, isLoadingBooks }) {
  return (
    <div className="list-books">
      {isLoadingBooks && (
        <div className="loading">
          <CircularProgress size={80} thickness={5} color="#ff3d00" />
          <br />
          <span>Loading books...</span>
        </div>
      )}
      {!isLoadingBooks && (
        <div className="list-books-content">
          {configuration.map(shelf => (
            <Shelf
              key={shelf.type}
              name={shelf.name}
              shelf={shelf.type}
              books={books}
              onCategorizeBook={onCategorizeBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Shelves.propTypes = propTypes;
Shelves.defaultProps = defaultProps;

export default Shelves;
