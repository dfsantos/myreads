import React from 'react';
import toJson from 'enzyme-to-json';

import Shelf from '../Shelf';

const BOOKSHELF_NAME = 'Shelf Name';
const BOOKSHELF_CATEGORY = 'read';

const onChangeBookCategory = jest.fn(() => () => {});

it('should render without erros', () => {
  shallow(
    <Shelf
      name={BOOKSHELF_NAME}
      shelf={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
});

it('snapshot without books', () => {
  const wrapper = shallow(
    <Shelf
      name={BOOKSHELF_NAME}
      shelf={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('snapshot with books', () => {
  const books = [
    { id: 1, title: 'Book A', shelf: BOOKSHELF_CATEGORY, imageLinks: { thumbnail: '' } },
    { id: 2, title: 'Book B', shelf: BOOKSHELF_CATEGORY, imageLinks: { thumbnail: '' } },
  ];
  const wrapper = shallow(
    <Shelf
      books={books}
      name={BOOKSHELF_NAME}
      shelf={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('onChangeBookCategory should be called with book as parameter', () => {
  const book = {
    id: 1,
    title: 'Book A',
    shelf: BOOKSHELF_CATEGORY,
    imageLinks: { thumbnail: '' },
  };
  const wrapper = shallow(
    <Shelf
      books={[book]}
      name={BOOKSHELF_NAME}
      shelf={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
  expect(onChangeBookCategory).toHaveBeenCalledWith(book);
});

it('should filter book by shelf category', () => {
  const bookA = {
    id: 1,
    title: 'Book A',
    shelf: BOOKSHELF_CATEGORY,
    imageLinks: { thumbnail: '' },
  };
  const bookB = {
    id: 2,
    title: 'Book B',
    shelf: 'wrongCategory',
    imageLinks: { thumbnail: '' },
  };
  const wrapper = shallow(
    <Shelf
      books={[bookA, bookB]}
      name={BOOKSHELF_NAME}
      shelf={BOOKSHELF_CATEGORY}
      onCategorizeBook={onChangeBookCategory}
    />
  );
  expect(onChangeBookCategory).toHaveBeenCalledWith(bookA);
  expect(onChangeBookCategory).not.toHaveBeenCalledWith(bookB);
});
