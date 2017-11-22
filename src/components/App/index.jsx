import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import SideBar from '../SideBar';
import Shelves from '../Shelves';
import Search from '../Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.state.load();
    this.onCategorizeBook = this.onCategorizeBook.bind(this);
    this.handleToggleSideBar = this.handleToggleSideBar.bind(this);
  }

  onCategorizeBook(book, shelf) {
    this.setState((state, props) => props.state.categorizeBook(state, book, shelf));
  }

  handleToggleSideBar() {
    this.setState((state, props) => props.state.toogleSideBar(state));
  }

  render() {
    const { searchBooks } = this.props.state;
    const { books, isSideBarOpen } = this.state;
    return (
      <div className="App">
        <AppBar title="BookFlix" onLeftIconButtonTouchTap={this.handleToggleSideBar} />
        <SideBar open={isSideBarOpen} onClose={this.handleToggleSideBar} />
        <Route
          path="/shelves"
          render={() => <Shelves books={books} onCategorizeBook={this.onCategorizeBook} />}
        />
        <Route
          path="/search"
          render={() => <Search onCategorizeBook={this.onCategorizeBook} onSearch={searchBooks} />}
        />
      </div>
    );
  }
}

export default App;
