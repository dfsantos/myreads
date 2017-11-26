import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { orangeA700 } from 'material-ui/styles/colors';
import SearchIcon from 'material-ui/svg-icons/action/search';
import LibraryBooksIcon from 'material-ui/svg-icons/av/library-books';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

const defaultProps = {
  open: false,
};

const iconStyle = { marginRight: '10px', color: orangeA700 };

function SideBar({ open, onClose }) {
  return (
    <Drawer docked={false} open={open} onRequestChange={onClose}>
      <AppBar title="BookFlix" onLeftIconButtonTouchTap={onClose} />
      <Link className="menu-item-link" to="/">
        <MenuItem>
          <LibraryBooksIcon style={iconStyle} />My Shelves
        </MenuItem>
      </Link>
      <Link className="menu-item-link" to="/search">
        <MenuItem>
          <SearchIcon style={iconStyle} />Search
        </MenuItem>
      </Link>
    </Drawer>
  );
}

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;
