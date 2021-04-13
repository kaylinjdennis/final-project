import React from 'react';
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

function Profile(props) {

  const classes = useStyles();

  return (

    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <Avatar className={classes.icon}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
      </div>
    </Container>
  );
}

export default Profile;