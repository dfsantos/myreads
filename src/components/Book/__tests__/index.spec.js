import React from 'react';
import toJson from 'enzyme-to-json';

import Book from '../index';

const TITLE = "Book's Title";

const AUTHORS = ['Author of Book'];

const onChangeBookShelfListener = jest.fn();

it('should render without errors', () => {
  shallow(
    <Book
      title={TITLE}
      coverLink=""
      authors={AUTHORS}
      onChangeBookShelf={onChangeBookShelfListener}
    />
  );
});

it('default snapshot', () => {
  const wrapper = shallow(
    <Book
      title={TITLE}
      coverLink=""
      authors={AUTHORS}
      onChangeBookShelf={onChangeBookShelfListener}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('on select change should call onChangeBookShelfListener with selected value', () => {
  const SELECTED_VALUE = 'read';
  const event = [null, null, SELECTED_VALUE];
  const wrapper = shallow(
    <Book
      title={TITLE}
      coverLink=""
      authors={AUTHORS}
      onChangeBookShelf={onChangeBookShelfListener}
    />
  );
  const select = wrapper.find('DropDownMenu');

  select.simulate('change', event);

  expect(onChangeBookShelfListener).toHaveBeenCalled();
});
