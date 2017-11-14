import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', () => {
  shallow(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

it('updates on the same book should not replicate it in aplication state', () => {
  const wrapper = shallow(<App />);

  let book = { id: 'abc', category: 'read' };
  wrapper.instance().onCategorizeBook(book);
  expect(wrapper.state('books')).toHaveLength(1);

  book = { id: 'abc', category: 'none' };
  wrapper.instance().onCategorizeBook(book);
  expect(wrapper.state('books')).toHaveLength(1);

  book = { id: 'abc', category: 'wantToRead' };
  wrapper.instance().onCategorizeBook(book);
  expect(wrapper.state('books')).toHaveLength(1);

  book = { id: 'xyz', category: 'currentlyReading' };
  wrapper.instance().onCategorizeBook(book);
  expect(wrapper.state('books')).toHaveLength(2);
});
