import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function SideBar({ open, onClose }) {
  return (
    <Drawer docked={false} open={open} onRequestChange={onClose}>
      <AppBar title="BookFlix" onLeftIconButtonTouchTap={onClose} />
      <Link className="menu-item-link" to="/">
        <MenuItem>My Shelves</MenuItem>
      </Link>
      <Link className="menu-item-link" to="/search">
        <MenuItem>Search</MenuItem>
      </Link>
      <Link className="menu-item-link" to="/configuration">
        <MenuItem>Configurations</MenuItem>
      </Link>
    </Drawer>
  );
}

SideBar.propTypes = propTypes;

export default SideBar;
