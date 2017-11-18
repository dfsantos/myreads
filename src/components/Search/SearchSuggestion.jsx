import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  pause: PropTypes.bool,
};

const defaultProps = {
  pause: false,
};

class SearchSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = { words: _.shuffle(props.words) };
    this.suggestWord = this.suggestWord.bind(this);
    this.stop = setInterval(this.suggestWord, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.stop);
  }

  suggestWord() {
    this.setState(state => {
      const { words } = state;
      words.unshift(words.pop());
      return { words };
    });
  }

  render() {
    return (
      <div>
        {!this.props.pause && (
          <div className="search-suggestion">
            Try search for <br />
            "{this.state.words[0]}"
          </div>
        )}
      </div>
    );
  }
}

SearchSuggestion.propTypes = propTypes;
SearchSuggestion.defaultProps = defaultProps;

export default SearchSuggestion;
