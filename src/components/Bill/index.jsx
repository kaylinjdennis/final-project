import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Typography, Button, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import useStyles from '../styles';
import ReceiptIcon from '@material-ui/icons/Receipt';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { palette } from '@material-ui/system';
import Box from '@material-ui/core/Box';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


function Bill(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (    
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.icon}>
          <ReceiptIcon />
        </Avatar>
        <Typography className={classes.heading} component="h1" variant="h5">
          Bill
        </Typography>

        {/* if bill type owing render bill details this way */}

        {/* <Grid container alignItems='center' spacing={2} direction='row'>
          <Grid container alignItems='center' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
              Description: 
            </Typography>
          </Grid>
          <Grid container alignItems='center' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
              Created By:
            </Typography>
          </Grid>
          <Grid container alignItems='center' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
             Group Name:
            </Typography>
          </Grid>
          <Grid container alignItems='center' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
              $ Due:
            </Typography>
          </Grid>
        </Grid> */}

        {/* else bill type is owed, render this way */}
        <Grid container alignItems='center' spacing={2} direction='row'>
          <Grid container alignItems='center' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
              Description: 
            </Typography>
          </Grid>
          <Grid container alignItems='center' item xs={12} sm={12}>
            <Typography component="h1" variant="button">
              Total:
            </Typography>
          </Grid>

          <Grid container spacing={1} direction='row'>
            <Grid item xs={6} md={6} className={classes.billFriends} >
              <Box bgcolor='#0088FE'>
              <Typography variant="button" >
                Have Paid:
              </Typography>
              <div className={classes.demo}>
                <List dense={dense}>
                  {generate(
                    <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.friends}
                        src="https://i.pravatar.cc/300"
                      />
                      </ListItemAvatar>
                      <ListItemText
                        primary="friend"
                        secondary={secondary ? 'Secondary text' : null}
                      />
                    </ListItem>,
                  )}
                </List>
              </div>
              </Box>
            </Grid>
            <Grid item xs={6} className={classes.billFriends}>
              <Box bgcolor='#00C49F'>
              <Typography variant="button" >
                Have Not Paid:
              </Typography>
              <div className={classes.demo}>
                <List dense={dense}>
                  {generate(
                    <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.friends}
                        src="https://i.pravatar.cc/300"
                      />
                      </ListItemAvatar>
                      <ListItemText
                        primary="friend"
                        secondary={secondary ? 'Secondary text' : null}
                      />
                    </ListItem>,
                  )}
                </List>
              </div>
              </Box>
            </Grid>
          </Grid>
          <PieChart width={400} height={400} alignItems='flex-start'>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>

        </Grid>
      </div>
    </Container>
  );
}


export default Bill;

