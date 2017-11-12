import React from 'react';
import toJson from 'enzyme-to-json';

import BookshelfPage from '../index';

it('should render without errors', () => {
  shallow(<BookshelfPage />);
});

it('snapshot without books', () => {
  const wrapper = shallow(<BookshelfPage />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
