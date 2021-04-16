import React from 'react';
import { Typography, Button, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import useStyles from '../styles';
import ReceiptIcon from '@material-ui/icons/Receipt';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

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

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className={classes.billFriends}>
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
                        primary="Single-line item"
                        secondary={secondary ? 'Secondary text' : null}
                      />
                    </ListItem>,
                  )}
                </List>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className={classes.billFriends}>
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
                        primary="Single-line item"
                        secondary={secondary ? 'Secondary text' : null}
                      />
                    </ListItem>,
                  )}
                </List>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}


export default Bill;

