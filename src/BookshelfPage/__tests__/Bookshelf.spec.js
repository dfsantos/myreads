import React from 'react';
import toJson from 'enzyme-to-json';

import Bookshelf from '../Bookshelf';

const BOOKSHELF_NAME = 'Bookshelf Name';
const BOOKSHELF_TYPE = 'READING';

it('should render without erros', () => {
  shallow(<Bookshelf name={BOOKSHELF_NAME} type={BOOKSHELF_TYPE} />);
});

it('snapshot without books', () => {
  const wrapper = shallow(<Bookshelf name={BOOKSHELF_NAME} type={BOOKSHELF_TYPE} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
