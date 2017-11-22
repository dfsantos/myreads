import React from 'react';

import SearchSuggestion from '../SearchSuggestion';

const words = ['Android'];

it('it should render without errors', () => {
  shallow(<SearchSuggestion words={words} />);
});

it('snapshot', () => {
  const wrapper = shallow(<SearchSuggestion words={words} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
