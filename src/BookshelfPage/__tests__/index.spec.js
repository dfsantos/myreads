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
