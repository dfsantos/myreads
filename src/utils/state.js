const initialState = {
  books: [],
  isSideBarOpen: false,
};

const persist = state => localStorage.setItem('state', JSON.stringify(state));

const load = () => JSON.parse(localStorage.getItem('state')) || initialState;

export { persist, load };
