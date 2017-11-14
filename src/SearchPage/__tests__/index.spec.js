import React from 'react';
import toJson from 'enzyme-to-json';

jest.mock('../../BooksAPI');
import * as BooksAPI from '../../BooksAPI';

import SearchPage from '../index';

const onCategorizeBookListener = jest.fn(() => () => {});

it('should render without errors', () => {
  shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
});

it('default snapshot', () => {
  const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('onSearch method should call BooksAPI.search with search query', async () => {
  const SEARCH_QUERY = 'android';
  const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
  const event = { target: { value: SEARCH_QUERY } };

  wrapper.instance().onSearch(event);

  expect(BooksAPI.search).toHaveBeenCalledWith(SEARCH_QUERY, 10);
});
