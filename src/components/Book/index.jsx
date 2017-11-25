import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardText, CardActions, CardMedia } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  coverLink: PropTypes.string.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string,
};

const defaultProps = {
  subtitle: '',
  description: '',
  authors: [],
  shelf: 'none',
};

const SELECTED_VALUE = 2;

const style = {
  bookCard: { heigth: 250, width: 210, padding: 3, margin: 10 },
  bookCover: { heigth: 250, width: 203, maxWidth: 203, minWidth: 203 },
};

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { shelf: props.shelf };
    this.onChangeBookShelf = this.onChangeBookShelf.bind(this);
  }

  onChangeBookShelf(...args) {
    this.setState(
      { shelf: args[SELECTED_VALUE] },
      this.props.onChangeBookShelf(args[SELECTED_VALUE])
    );
  }

  render() {
    const { title, authors, coverLink } = this.props;
    const { shelf } = this.state;

    return (
      <Card style={style.bookCard}>
        <CardMedia>
          <div className="cover-wrapper">
            <img src={coverLink} alt={title} style={style.bookCover} />
          </div>
        </CardMedia>
        <CardText>{authors.join(', ').trim()}</CardText>
        <CardActions>
          <DropDownMenu value={shelf} onChange={this.onChangeBookShelf}>
            <MenuItem value="none" primaryText="None" />
            <MenuItem value="currentlyReading" primaryText="Currently Reading" />
            <MenuItem value="wantToRead" primaryText="Want To Read" />
            <MenuItem value="read" primaryText="Read" />
          </DropDownMenu>
        </CardActions>
      </Card>
    );
  }
}

Book.propTypes = propTypes;
Book.defaultProps = defaultProps;

export default Book;
