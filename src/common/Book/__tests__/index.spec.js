import React from 'react';
import toJson from 'enzyme-to-json';

import Book from '../index';

const TITLE = "Book's Title";
const AUTHORS = ['Author of Book'];

it('should render without errors', () => {
  shallow(<Book title={TITLE} authors={AUTHORS} />);
});

it('default snapshot', () => {
  const wrapper = shallow(<Book title={TITLE} authors={AUTHORS} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
