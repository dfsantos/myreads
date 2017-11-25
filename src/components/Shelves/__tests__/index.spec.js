import React from 'react';
import toJson from 'enzyme-to-json';

import Shelves from '../index';

import configuration from '../../../config/shelf.config.json';

const onCategorizeBookListener = jest.fn(() => () => {});
const books = [{ title: 'Book A' }, { title: 'Book B' }];

it('should render without errors', () => {
  shallow(
    <Shelves
      books={books}
      configuration={configuration}
      onCategorizeBook={onCategorizeBookListener}
    />
  );
});

it('snapshot without books', () => {
  const wrapper = shallow(
    <Shelves
      books={books}
      configuration={configuration}
      onCategorizeBook={onCategorizeBookListener}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('snapshot with books', () => {
  const wrapper = shallow(
    <Shelves
      books={books}
      configuration={configuration}
      onCategorizeBook={onCategorizeBookListener}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
