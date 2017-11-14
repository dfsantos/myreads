import React from 'react';
import toJson from 'enzyme-to-json';

import SearchResult from '../SearchResult';

const onCategorizeBookListener = jest.fn(() => () => {});

it('should render without errors', () => {
  shallow(<SearchResult onCategorizeBook={onCategorizeBookListener} />);
});

it('empty data snapshot', () => {
  const wrapper = shallow(<SearchResult onCategorizeBook={onCategorizeBookListener} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('not empty data snapshot', () => {
  const books = [{ id: 1, title: 'Book A' }, { id: 2, title: 'Book B' }];
  const wrapper = shallow(
    <SearchResult books={books} onCategorizeBook={onCategorizeBookListener} />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('onCategorizeBookListener should be called with book as parameter', () => {
  const book = { id: 1, title: 'Book A' };
  const wrapper = shallow(
    <SearchResult books={[book]} onCategorizeBook={onCategorizeBookListener} />
  );
  expect(onCategorizeBookListener).toHaveBeenCalledWith(book);
});
