import React from 'react';

import SideBar from '../index';

const onCloseListener = jest.fn();

it('should render without errors', () => {
  shallow(<SideBar open onClose={onCloseListener} />);
});

it('snapshot of SideBar closed', () => {
  const wrapper = shallow(<SideBar onClose={onCloseListener} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('snapshot of SideBar opened', () => {
  const wrapper = shallow(<SideBar open onClose={onCloseListener} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
