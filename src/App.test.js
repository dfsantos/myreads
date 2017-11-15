import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

localStorage.getItem = jest.fn(() => '{"books":[]}');

it('renders without crashing', () => {
  shallow(<App />);
});

it('updates on the same book should not replicate it in aplication state', () => {
  const wrapper = shallow(<App />);

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

it('should load state from localStorage', async () => {
  shallow(<App />);
  expect(localStorage.getItem).toHaveBeenCalledWith('state');
});

it('should save state in localStorage when state is updated', async () => {
  const wrapper = shallow(<App />);
  wrapper.state('books', [{ title: 'Any Book' }]);
  expect(localStorage.setItem).toHaveBeenCalledWith('state', JSON.stringify(wrapper.state()));
});
