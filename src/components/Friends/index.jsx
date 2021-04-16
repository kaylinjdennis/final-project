import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Toolbar, TextField, Button } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles'

import PersonAddIcon from '@material-ui/icons/PersonAdd';


const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));



function Friends(props) {
  const classes = useStyles();
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };


  return (
    <>
      <Container component="main" maxWidth="xs" >

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          // justify="space-around"
          // style={{ minHeight: '90vh' }}
        >

        <Grid item xs={12}>

          <br />

        <Toolbar>
          <form>
          <div className={classes.searchContainer}>
            <PersonAddIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Search for a friend!"
              variant="standard"
            />
          <Button color="secondary" size="small" type="submit">Submit</Button>
          </div>
          </form>
        </Toolbar>

        <br />

        <div>
          <Typography variant="h4">Results: </Typography>
          <Typography>*</Typography>
        </div>

        <br />

          
          </Grid> 
          <Typography variant="h4">Your friend requests:</Typography>  


          <br />

          <Typography variant="h4">Friends list:</Typography>  
          


        </Grid> 


      </Container>




    </>
  );
}

export default Friends;