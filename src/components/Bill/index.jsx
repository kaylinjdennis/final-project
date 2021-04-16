import React from 'react';
import { Typography, Button, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import useStyles from '../styles';
import ReceiptIcon from '@material-ui/icons/Receipt';



function Bill(props) {
  const classes = useStyles();

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

        <Grid container alignItems='center' spacing={2} direction='row'>
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
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
           >
          Pay Bill
          </Button>
        </Grid>

        {/* else bill type is owed, render this way */}
        
      </div>
    </Container>
  );
}


export default Bill;

