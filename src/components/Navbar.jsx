import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@material-ui/core";
import { Receipt } from "@material-ui/icons";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Receipt />
          <Button
            variant="contained"
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Bill Share
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/addbill">
              Add New Bill
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/creategroup">
              Create Group
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/friends">
              Add Friends
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/logout">
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
