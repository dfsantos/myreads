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
  onChangeBookCategory: PropTypes.func.isRequired,
  category: PropTypes.string,
};

const defaultProps = {
  subtitle: '',
  description: '',
  authors: [],
  category: 'none',
};

const cardStyle = { heigth: 250, width: 210, padding: 3, margin: 10 };
const bookImageStyle = { heigth: 250, width: 203, maxWidth: 203, minWidth: 203 };

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { category: props.category };
    this.onChangeBookCategory = this.onChangeBookCategory.bind(this);
  }

  onChangeBookCategory(...args) {
    this.setState({ category: args[2] }, this.props.onChangeBookCategory(args[2]));
  }

  render() {
    const { title, authors, coverLink } = this.props;
    const { category } = this.state;

    return (
      <Card style={cardStyle}>
        <CardMedia style={bookImageStyle}>
          <img src={coverLink} alt={title} style={bookImageStyle} />
        </CardMedia>
        <CardText>{authors.join(', ').trim()}</CardText>
        <CardActions>
          <DropDownMenu value={category} onChange={this.onChangeBookCategory}>
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
