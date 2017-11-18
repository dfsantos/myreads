import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

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
      <AppBar title="My Reads" onLeftIconButtonTouchTap={onClose} />
      <MenuItem>My Shelves</MenuItem>
      <MenuItem>Search</MenuItem>
      <MenuItem>Configurations</MenuItem>
    </Drawer>
  );
}

SideBar.propTypes = propTypes;

export default SideBar;
