import React from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';

const propTypes = {
  books: PropTypes.array,
  onCategorizeBook: PropTypes.func.isRequired,
  configuration: PropTypes.array.isRequired,
};

const defaultProps = {
  books: [],
};

function Shelves({ books, configuration, onCategorizeBook }) {
  return (
    <div className="list-books">
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
    </div>
  );
}

Shelves.propTypes = propTypes;
Shelves.defaultProps = defaultProps;

export default Shelves;
