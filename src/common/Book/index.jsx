import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  onChangeBookCategory: PropTypes.func.isRequired,
  coverLink: PropTypes.string.isRequired,
};

function Book({ title, coverLink, onChangeBookCategory }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: `url(${coverLink})` }}
        />
        <div className="book-shelf-changer">
          <select onChange={event => onChangeBookCategory(event.target.value)} defaultValue="none">
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{[].join(', ')}</div>
    </div>
  );
}

Book.propTypes = propTypes;

export default Book;
