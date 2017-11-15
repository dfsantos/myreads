import React from 'react';
import toJson from 'enzyme-to-json';

import BookshelfPage from '../index';

const onCategorizeBookListener = jest.fn(() => () => {});

it('should render without errors', () => {
  shallow(<BookshelfPage onCategorizeBook={onCategorizeBookListener} />);
});

it('snapshot without books', () => {
  const wrapper = shallow(<BookshelfPage onCategorizeBook={onCategorizeBookListener} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('onCategorizeBook method should a function to be used for categorize book', () => {
  const book = {};
  const wrapper = shallow(<BookshelfPage onCategorizeBook={onCategorizeBookListener} />);
  expect(wrapper.instance().onCategorizeBook(book)).toBeInstanceOf(Function);
});

it('', () => {
  const book = {};
  const wrapper = shallow(<BookshelfPage onCategorizeBook={onCategorizeBookListener} />);
  wrapper.instance().onCategorizeBook(book)('read');
  expect(onCategorizeBookListener).toHaveBeenCalled();
});
