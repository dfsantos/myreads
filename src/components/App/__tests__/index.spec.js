import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../index';

localStorage.getItem = jest.fn(() => '{"books":[]}');
const state = { load: jest.fn(), categorizeBook: jest.fn() };

xit('renders without crashing', () => {
  shallow(<App state={state} />);
});

xit('updates on the same book should not replicate it in aplication state', () => {
  const wrapper = shallow(<App state={state} />);

  let book = { id: 'abc', category: 'read' };
  wrapper.instance().onCategorizeBook(book);
  expect(wrapper.state('books')).toHaveLength(1);

  book = { id: 'abc', category: 'none' };
  wrapper.instance().onCategorizeBook(book);
  expect(wrapper.state('books')).toHaveLength(0);

  book = { id: 'abc', category: 'wantToRead' };
  wrapper.instance().onCategorizeBook(book);
  expect(wrapper.state('books')).toHaveLength(1);

  book = { id: 'xyz', category: 'currentlyReading' };
  wrapper.instance().onCategorizeBook(book);
  expect(wrapper.state('books')).toHaveLength(2);
});

xit('should load state from localStorage', async () => {
  shallow(<App state={state} />);
  expect(localStorage.getItem).toHaveBeenCalledWith('state');
});

xit('should ensure a consistent state when localStorage cannot return a state', async () => {
  localStorage.getItem = jest.fn(() => null);
  const wrapper = shallow(<App state={state} />);
  expect(localStorage.getItem).toHaveBeenCalledWith('state');
  expect(wrapper.state('books')).toBeDefined();
});

xit('should save state in localStorage when state is updated', async () => {
  const wrapper = shallow(<App state={state} />);
  wrapper.state('books', [{ title: 'Any Book' }]);
  expect(localStorage.setItem).toHaveBeenCalledWith('state', JSON.stringify(wrapper.state()));
});
