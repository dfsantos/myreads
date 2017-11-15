import React from 'react';
import toJson from 'enzyme-to-json';

import Book from '../index';

const TITLE = "Book's Title";

const AUTHORS = ['Author of Book'];

const onChangeBookCategoryListener = jest.fn();

it('should render without errors', () => {
  shallow(
    <Book
      title={TITLE}
      coverLink=""
      authors={AUTHORS}
      onChangeBookCategory={onChangeBookCategoryListener}
    />
  );
});

it('default snapshot', () => {
  const wrapper = shallow(
    <Book
      title={TITLE}
      coverLink=""
      authors={AUTHORS}
      onChangeBookCategory={onChangeBookCategoryListener}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('on select change should call onChangeBookCategoryListener with selected value', () => {
  const SELECTED_VALUE = 'read';
  const event = { target: { value: SELECTED_VALUE } };
  const wrapper = shallow(
    <Book
      title={TITLE}
      coverLink=""
      authors={AUTHORS}
      onChangeBookCategory={onChangeBookCategoryListener}
    />
  );
  const select = wrapper.find('select');

  select.simulate('change', event);

  expect(onChangeBookCategoryListener).toHaveBeenCalledWith(SELECTED_VALUE);
});
