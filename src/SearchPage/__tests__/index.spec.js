import React from 'react';
import toJson from 'enzyme-to-json';

import SearchPage from '../index';

it('should render without errors', () => {
  shallow(<SearchPage />);
});

it('default snapshot', () => {
  const wrapper = shallow(<SearchPage />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
