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

describe('when user type a search text', () => {
  beforeEach(() => (BooksAPI.search = jest.fn(() => Promise.resolve([]))));
  it('onSearch method should call BooksAPI.search with search query', () => {
    const SEARCH_QUERY = 'android';
    const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
    const event = { target: { value: SEARCH_QUERY } };

    wrapper.instance().onSearch(event);

    expect(BooksAPI.search).toHaveBeenCalledWith(SEARCH_QUERY, 10);
  });
  xdescribe('and search does not return with error', () => {
    beforeEach(() => (BooksAPI.search = jest.fn(() => Promise.resolve([{}]))));
    it('state.searchQuery should be an empty string', () => {
      const SEARCH_QUERY = 'android';
      const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
      const event = { target: { value: SEARCH_QUERY } };

      wrapper.instance().onSearch(event);

      expect(wrapper.state('searchQuery')).not.toHaveLength(0);
      expect(typeof wrapper.state('searchQuery')).toBe('string');
    });
    it('state.searchResult should be an empty array', () => {
      const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
      const SEARCH_QUERY = 'android';
      const event = { target: { value: SEARCH_QUERY } };

      wrapper.instance().onSearch(event);

      expect(wrapper.state('searchResult')).not.toHaveLength(0);
      expect(wrapper.state('searchResult')).toBeInstanceOf(Array);
    });
  });
  describe('and the search returns with error', () => {
    beforeEach(() => (BooksAPI.search = jest.fn(() => Promise.resolve({ error: true }))));
    it('state.searchQuery should be an empty string', () => {
      const SEARCH_QUERY = 'anytext';
      const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
      const event = { target: { value: SEARCH_QUERY } };

      wrapper.instance().onSearch(event);

      expect(wrapper.state('searchQuery')).toHaveLength(0);
      expect(typeof wrapper.state('searchQuery')).toBe('string');
    });
    it('state.searchResult should be an empty array', () => {
      const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
      const SEARCH_QUERY = 'anytext';
      const event = { target: { value: SEARCH_QUERY } };

      wrapper.instance().onSearch(event);

      expect(wrapper.state('searchResult')).toHaveLength(0);
      expect(wrapper.state('searchResult')).toBeInstanceOf(Array);
    });
  });
});

describe('when search text is empty', () => {
  it('onSearch method should not call BooksAPI.search', () => {
    BooksAPI.search = jest.fn();
    const SEARCH_QUERY = '';
    const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
    const event = { target: { value: SEARCH_QUERY } };

    wrapper.instance().onSearch(event);

    expect(BooksAPI.search).not.toHaveBeenCalled();
  });
  it('state.searchQuery should be an empty string', () => {
    const SEARCH_QUERY = '';
    const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
    const event = { target: { value: SEARCH_QUERY } };

    wrapper.instance().onSearch(event);

    expect(wrapper.state('searchQuery')).toHaveLength(0);
    expect(typeof wrapper.state('searchQuery')).toBe('string');
  });
  it('state.searchResult should be an empty array', () => {
    const SEARCH_QUERY = '';
    const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
    const event = { target: { value: SEARCH_QUERY } };

    wrapper.instance().onSearch(event);

    expect(wrapper.state('searchResult')).toHaveLength(0);
    expect(wrapper.state('searchResult')).toBeInstanceOf(Array);
  });
});

it('onCategorizeBook method should a function to be used for categorize book', () => {
  const book = {};
  const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
  expect(wrapper.instance().onCategorizeBook(book)).toBeInstanceOf(Function);
});

it('', () => {
  const book = {};
  const wrapper = shallow(<SearchPage onCategorizeBook={onCategorizeBookListener} />);
  wrapper.instance().onCategorizeBook(book)('read');
  expect(onCategorizeBookListener).toHaveBeenCalled();
});
