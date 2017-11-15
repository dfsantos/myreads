import React from 'react';
import toJson from 'enzyme-to-json';

import Bookshelf from '../Bookshelf';

const BOOKSHELF_NAME = 'Bookshelf Name';
const BOOKSHELF_CATEGORY = 'read';

const onChangeBookCategory = jest.fn(() => () => {});

it('should render without erros', () => {
  shallow(
    <Bookshelf
      name={BOOKSHELF_NAME}
      category={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
});

it('snapshot without books', () => {
  const wrapper = shallow(
    <Bookshelf
      name={BOOKSHELF_NAME}
      category={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('snapshot with books', () => {
  const books = [
    { id: 1, title: 'Book A', category: BOOKSHELF_CATEGORY, imageLinks: { thumbnail: '' } },
    { id: 2, title: 'Book B', category: BOOKSHELF_CATEGORY, imageLinks: { thumbnail: '' } },
  ];
  const wrapper = shallow(
    <Bookshelf
      books={books}
      name={BOOKSHELF_NAME}
      category={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('onChangeBookCategory should be called with book as parameter', () => {
  const book = {
    id: 1,
    title: 'Book A',
    category: BOOKSHELF_CATEGORY,
    imageLinks: { thumbnail: '' },
  };
  const wrapper = shallow(
    <Bookshelf
      books={[book]}
      name={BOOKSHELF_NAME}
      category={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
  expect(onChangeBookCategory).toHaveBeenCalledWith(book);
});

it('should filter book by shelf category', () => {
  const bookA = {
    id: 1,
    title: 'Book A',
    category: BOOKSHELF_CATEGORY,
    imageLinks: { thumbnail: '' },
  };
  const bookB = {
    id: 2,
    title: 'Book B',
    category: 'wrongCategory',
    imageLinks: { thumbnail: '' },
  };
  const wrapper = shallow(
    <Bookshelf
      books={[bookA, bookB]}
      name={BOOKSHELF_NAME}
      category={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
  expect(onChangeBookCategory).toHaveBeenCalledWith(bookA);
  expect(onChangeBookCategory).not.toHaveBeenCalledWith(bookB);
});
