import * as BooksAPI from '../api/BooksAPI';

const initialState = {
  books: [],
  isSideBarOpen: false,
};

const persistOffline = state => localStorage.setItem('state', JSON.stringify(state));

const loadOfflineData = () => JSON.parse(localStorage.getItem('state')) || initialState;

const load = () => {
  const localData = loadOfflineData();
  //const books = await BooksAPI.getAll();
  //persistOffline(Object.assign(localData, { books }));
  return localData;
};

const persist = state => {
  let persistedState = Object.assign(state);
  persistOffline(state);
  try {
    const promises = state.books.map(book => BooksAPI.update(book, book.shelf));
    Promise.all(promises).then(() => {
      const syncBooks = state.books.map(book => Object.assign(book, { isSync: true }));
      persistOffline(Object.assign(state, { books: syncBooks }));
    });
  } catch (e) {
    console.log(e);
  }
  return persistedState;
};

const categorizeBook = (state, book, shelf) => {
  const books = state.books.filter(it => it.id !== book.id).concat(Object.assign(book, { shelf }));
  return persist(Object.assign(state, { books }));
};

const searchBooks = searchQuery => BooksAPI.search(searchQuery, 20);

const toogleSideBar = state => ({ isSideBarOpen: !state.isSideBarOpen });

export { load, categorizeBook, searchBooks, toogleSideBar };
