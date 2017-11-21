import * as BooksAPI from '../api/BooksAPI';

const initialState = {
  books: [],
  isSideBarOpen: false,
};

const persistOffline = state => localStorage.setItem('state', JSON.stringify(state));

const loadOfflineData = () => JSON.parse(localStorage.getItem('state')) || initialState;

const loadState = () => {
  const localData = loadOfflineData();
  BooksAPI.getAll().then(cloudBooks => {
    persistOffline(Object.assign(localData, { books: cloudBooks }));
  });
  return localData;
};

const persist = state => {
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
};

export { persist, persistOffline, loadState };
