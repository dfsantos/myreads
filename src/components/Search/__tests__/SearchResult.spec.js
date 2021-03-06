import React from 'react';
import toJson from 'enzyme-to-json';

import SearchResult from '../SearchResult';

const onCategorizeBookListener = jest.fn(() => () => {});

it('should render without errors', () => {
  shallow(<SearchResult searchQuery="" onCategorizeBook={onCategorizeBookListener} />);
});

it('empty data snapshot', () => {
  const wrapper = shallow(
    <SearchResult searchQuery="android" onCategorizeBook={onCategorizeBookListener} />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('not empty data snapshot', () => {
  const books = [
    { id: 1, title: 'Book A', imageLinks: { thumbnail: '' } },
    { id: 2, title: 'Book B', imageLinks: { thumbnail: '' } },
  ];
  const wrapper = shallow(
    <SearchResult searchQuery="" books={books} onCategorizeBook={onCategorizeBookListener} />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('onCategorizeBookListener should be called with book as parameter', () => {
  const book = { id: 1, title: 'Book A', imageLinks: { thumbnail: '' } };
  const wrapper = shallow(
    <SearchResult searchQuery="" books={[book]} onCategorizeBook={onCategorizeBookListener} />
  );
  expect(onCategorizeBookListener).toHaveBeenCalledWith(book);
});
