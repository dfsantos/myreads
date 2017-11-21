import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import shelfConfig from '../../config/bookshelf.config.json';

const propTypes = {
  books: PropTypes.array,
  onCategorizeBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

class Shelves extends Component {
  constructor(props) {
    super(props);
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
  }

  onCategorizeBook(book) {
    return shelf => this.props.onCategorizeBook(Object.assign(book, { shelf }));
  }

  render() {
    const { books } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-content">
          {shelfConfig.map(shelf => (
            <Shelf
              key={shelf.type}
              name={shelf.name}
              shelf={shelf.type}
              books={books}
              onCategorizeBook={this.onCategorizeBook}
            />
          ))}
        </div>
      </div>
    );
  }
}

Shelves.propTypes = propTypes;
Shelves.defaultProps = defaultProps;

export default Shelves;
