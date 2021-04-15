// User can view what groups they are a part of
// [Stretch] View a groups page, delete a group, remove yourself from a group
// User views totals owed, and owed to them
// User can click on bills they owe to go to them
// User can view bill they have posted

import { React, PureComponent, useState } from 'react';
import PropTypes from 'prop-types';

import { Paper, Grid, Avatar, Icon, Box, Typography, Tab, Tabs, AppBar, makeStyles } from '@material-ui/core/';

import Divider from '@material-ui/core/Divider';


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";

//actual
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';

const data = [
  {
    name: 'Your Totals',
    Owed: 300,
    Owing: -500
  }
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});


export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="space-around"
    // style={{ minHeight: '90vh' }}
    >
      <Grid item xs={12}>
      
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <br />

          
			</Grid>   

          <BarChart
            width={300}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
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
<br />
          {/* <Divider variant="middle" /> */}

    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PeopleIcon />} label="Groups" />
        <Tab icon={<AccountBalanceWalletIcon />} label="Bills" />
        <Tab icon={<AddToHomeScreenIcon />} label="Your Created Bills" />
      </Tabs>
    </Paper>
    </Grid>

    </>
  );
}