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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.pause && this.stop === null) {
      this.stop = setInterval(this.suggestWord, 2500);
    } else {
      clearInterval(this.stop);
      this.stop = null;
    }
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
    const { pause } = this.props;
    const { words } = this.state;
    return (
      <div>
        {!pause && (
          <div className="search-suggestion">Try search for "{words[0].toLowerCase()}"</div>
        )}
      </div>
    );
  }
}

SearchSuggestion.propTypes = propTypes;
SearchSuggestion.defaultProps = defaultProps;

export default SearchSuggestion;
