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
      onChangeBookCategory={onChangeBookShelfListener}
    />
  );
});

it('default snapshot', () => {
  const wrapper = shallow(
    <Book
      title={TITLE}
      coverLink=""
      authors={AUTHORS}
      onChangeBookCategory={onChangeBookShelfListener}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

xit('on select change should call onChangeBookShelfListener with selected value', () => {
  const SELECTED_VALUE = 'read';
  const event = { target: { value: SELECTED_VALUE } };
  const wrapper = shallow(
    <Book
      title={TITLE}
      coverLink=""
      authors={AUTHORS}
      onChangeBookShelf={onChangeBookShelfListener}
    />
  );
  const select = wrapper.find('select');

  select.simulate('change', event);

  expect(onChangeBookShelfListener).toHaveBeenCalledWith(SELECTED_VALUE);
});
