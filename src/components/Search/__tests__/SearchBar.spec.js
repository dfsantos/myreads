import React from 'react';
import toJson from 'enzyme-to-json';

import SearchBar from '../SearchBar';

const onSearchEventListener = jest.fn();

it('should render without errors', () => {
  shallow(<SearchBar onSearch={onSearchEventListener} />);
});

it('should call onSearchEventListener when value change', () => {
  const wrapper = shallow(<SearchBar onSearch={onSearchEventListener} />);
  const input = wrapper.find('SearchInput');
  const event = { target: { value: 'android' } };

  input.simulate('change', event);

  expect(onSearchEventListener).toHaveBeenCalled();
});

it('default snapshot', () => {
  const wrapper = shallow(<SearchBar onSearch={onSearchEventListener} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
