import React from 'react';
import toJson from 'enzyme-to-json';

import SearchInput from '../SearchInput';

const onChangeListener = jest.fn();

it('should render without errors', () => {
  shallow(<SearchInput onChange={onChangeListener} />);
});

it('should call onChangeListener when value change', () => {
  const wrapper = shallow(<SearchInput onChange={onChangeListener} />);
  const input = wrapper.find('input');
  const event = { target: { value: 'android' } };

  input.simulate('change', event);

  expect(onChangeListener).toHaveBeenCalled();
});

it('default snpashot', () => {
  const wrapper = shallow(<SearchInput onChange={onChangeListener} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
