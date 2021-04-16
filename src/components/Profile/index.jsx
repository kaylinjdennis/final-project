import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import useStyles from '../styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GroupIcon from '@material-ui/icons/Group';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

const data = [
  {
    name: 'Your Totals',
    Owed: 300,
    Owing: -500
  }
];

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
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <Avatar className={classes.icon}>
          <AccountBoxIcon />
        </Avatar>
        <Typography className={classes.heading} component="h1" variant="h5">
          Profile
        </Typography>
        <BarChart className={classes.barchart}
            width={300}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="Owed" fill="#8884d8" />
            <Bar dataKey="Owing" fill="#82ca9d" />
          </BarChart>

        <Grid container alignItems='center' spacing={2} direction='row'>
          <Grid container alignItems='center' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
            <FileCopyIcon fontSize='large'/> Bills Created 
            </Typography>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <ArrowDropDownIcon fontSize='large' alignItems='center'/>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/bills/:id"> Bill1 </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/billd/:id"> Bill2</MenuItem>
            </Menu>
          </Grid>
          <Grid container alignItems='center' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
            < MonetizationOnIcon fontSize='large' /> Bills To Pay
            </Typography>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <ArrowDropDownIcon fontSize='large'/>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/bills/:id"> Bill3 </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/billd/:id"> Bill4</MenuItem>
            </Menu>
          </Grid>
       
          <Grid container alignItems='flex-end' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
            <GroupIcon fontSize='large'/> Groups Part Of
            </Typography>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <ArrowDropDownIcon fontSize='large'/>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/groups"> Group 1 </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/groups"> Group 2</MenuItem>
            </Menu>
          </Grid>
        </Grid>
  </div>
</Container>

);
}

export default Profile;