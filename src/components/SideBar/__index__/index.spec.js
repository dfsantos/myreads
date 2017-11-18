import React from 'react';

import SideBar from '../index';

const onCloseListener = jest.fn();

it('should render without errors', () => {
  shallow(<SideBar open onClose={onCloseListener} />);
});
