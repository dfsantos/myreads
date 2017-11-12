import React from 'react';
import toJson from 'enzyme-to-json';

import SearchResult from '../SearchResult';

it('should render without errors', () => {
  shallow(<SearchResult />);
});

it('empty data snapshot', () => {
  const wrapper = shallow(<SearchResult />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('not empty data snapshot', () => {
  const books = [{ id: 1, title: 'Book A' }, { id: 2, title: 'Book B' }];
  const wrapper = shallow(<SearchResult books={books} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
