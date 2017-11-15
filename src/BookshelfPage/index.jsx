import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Bookshelf from './Bookshelf';

const propTypes = {
  books: PropTypes.array,
  onCategorizeBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

class BookshelfPage extends Component {
  constructor(props) {
    super(props);
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
  }

  onCategorizeBook(book) {
    return category => this.props.onCategorizeBook(Object.assign(book, { category }));
  }

  render() {
    const { books } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              name="Currently Reading"
              category="currentlyReading"
              books={books}
              onCategorizeBook={this.onCategorizeBook}
            />
            <Bookshelf
              name="Read"
              category="read"
              books={books}
              onCategorizeBook={this.onCategorizeBook}
            />
            <Bookshelf
              name="Want to Read"
              category="wantToRead"
              books={books}
              onCategorizeBook={this.onCategorizeBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

BookshelfPage.propTypes = propTypes;
BookshelfPage.defaultProps = defaultProps;

export default BookshelfPage;
