import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../index';

jest.mock('../../../api/BooksAPI');
import * as BooksAPI from '../../../api/BooksAPI';

localStorage.getItem = jest.fn(() => '{"books":[]}');
const state = { load: jest.fn(), categorizeBook: jest.fn() };

it('renders without crashing', () => {
  shallow(<App />);
});

it('updates on the same book should not replicate it in aplication state', () => {
  const wrapper = shallow(<App />);

  let book = { id: 'abc' };
  wrapper.instance().onCategorizeBook(book)('read');
  expect(wrapper.state('books')).toHaveLength(1);

  book = { id: 'abc' };
  wrapper.instance().onCategorizeBook(book)('none');
  expect(wrapper.state('books')).toHaveLength(1);

  book = { id: 'abc' };
  wrapper.instance().onCategorizeBook(book)('wantToRead');
  expect(wrapper.state('books')).toHaveLength(1);

  book = { id: 'xyz' };
  wrapper.instance().onCategorizeBook(book)('currentlyReading');
  expect(wrapper.state('books')).toHaveLength(2);
});

it('should load state from localStorage', async () => {
  shallow(<App />);
  expect(localStorage.getItem).toHaveBeenCalledWith('state');
});

it('should ensure a consistent state when localStorage cannot return a state', async () => {
  localStorage.getItem = jest.fn(() => null);
  const wrapper = shallow(<App />);
  expect(localStorage.getItem).toHaveBeenCalledWith('state');
  expect(wrapper.state('books')).toBeDefined();
});

it('should save state in localStorage when state is updated', async () => {
  const wrapper = shallow(<App />);
  let book = { id: 'abc' };
  wrapper.instance().onCategorizeBook(book)('read');
  expect(localStorage.setItem).toHaveBeenCalledWith('state', JSON.stringify(wrapper.state()));
});

describe('when user type a search text', () => {
  beforeEach(() => (BooksAPI.search = jest.fn(() => Promise.resolve([{}]))));
  it('onSearch method should call BooksAPI.search with search query', () => {
    const SEARCH_QUERY = 'android';
    const wrapper = shallow(<App />);
    const event = { SEARCH_QUERY };

    wrapper.instance().onSearchBooks(SEARCH_QUERY);

    expect(BooksAPI.search).toHaveBeenCalledWith(SEARCH_QUERY, 20);
  });
  describe('and search does not return with error', () => {
    beforeEach(() => (BooksAPI.search = jest.fn(() => Promise.resolve([{}]))));
    it('onSearchBooks should return the search result', async () => {
      const SEARCH_QUERY = 'android';
      const wrapper = shallow(<App />);

      var result = await wrapper.instance().onSearchBooks(SEARCH_QUERY);

      expect(result).not.toHaveLength(0);
    });
  });
  describe('and the search returns with error', () => {
    beforeEach(() => (BooksAPI.search = jest.fn(() => Promise.resolve({ error: true }))));
    it('onSearchBooks should return an empty array', async () => {
      const SEARCH_QUERY = 'android';
      const wrapper = shallow(<App />);

      var result = await wrapper.instance().onSearchBooks(SEARCH_QUERY);

      expect(result).toHaveLength(0);
    });
  });
});

describe('when search text is empty', () => {
  it('onSearch method should not call BooksAPI.search', () => {
    BooksAPI.search = jest.fn();
    const SEARCH_QUERY = '';
    const wrapper = shallow(<App />);

    wrapper.instance().onSearchBooks(SEARCH_QUERY);

    expect(BooksAPI.search).not.toHaveBeenCalled();
  });
});

it('handleToggleSideBar should update isSideBarOpen', () => {
  const wrapper = shallow(<App />);

  wrapper.instance().handleToggleSideBar();
  expect(wrapper.state('isSideBarOpen')).toBe(true);

  wrapper.instance().handleToggleSideBar();
  expect(wrapper.state('isSideBarOpen')).toBe(false);
});
