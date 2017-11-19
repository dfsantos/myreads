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
      <MenuItem>
        <Link className="menu-item-link" to="/">
          My Shelves
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="menu-item-link" to="/search">
          Search
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="menu-item-link" to="/configuration">
          Configurations
        </Link>
      </MenuItem>
    </Drawer>
  );
}

SideBar.propTypes = propTypes;

export default SideBar;
