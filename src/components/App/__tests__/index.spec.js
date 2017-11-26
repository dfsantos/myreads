import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../index';

jest.mock('../../../api/BooksAPI');
import * as BooksAPI from '../../../api/BooksAPI';

localStorage.getItem = jest.fn(() => '{"books":[{}]}');
const state = { load: jest.fn(), categorizeBook: jest.fn() };

describe('App suite', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('should call BooksAPI.update when a book is categorized', async () => {
    BooksAPI.update = jest.fn(() => Promise.resolve());
    const wrapper = shallow(<App />);
    let book = { id: 'abc' };
    wrapper.instance().onCategorizeBook(book)('read');
    expect(BooksAPI.update).toHaveBeenCalled();
  });

  it('should ensure a consistent state when localStorage cannot return a state', async () => {
    localStorage.getItem = jest.fn(() => null);
    const wrapper = shallow(<App />);
    expect(localStorage.getItem).toHaveBeenCalledWith('state');
    expect(wrapper.state('books')).toBeDefined();
  });

  describe('when user type a search text', () => {
    beforeEach(() => (BooksAPI.search = jest.fn(() => Promise.resolve([{}]))));
    beforeEach(() => (BooksAPI.getAll = jest.fn(() => Promise.resolve([{}]))));
    it('onSearch method should call BooksAPI.search with search query', () => {
      const SEARCH_QUERY = 'android';
      const wrapper = shallow(<App />);
      const event = { SEARCH_QUERY };

      wrapper.instance().onSearchBooks(SEARCH_QUERY);

      expect(BooksAPI.search).toHaveBeenCalledWith(SEARCH_QUERY, 20);
    });
    describe('and search does not return with error', () => {
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
});
