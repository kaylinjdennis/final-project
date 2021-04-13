import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import useStyles from '../styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Profile(props) {

const classes = useStyles();

const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

return (
  <>
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <Avatar className={classes.icon}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>

        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Your Bills
        </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/"> Home </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/profile"> Profile</MenuItem>
        </Menu>
</div>
</Container>
  </>
);
}

export default Profile;