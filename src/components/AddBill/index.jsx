import React from 'react';
import { Typography, Button, Container, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PostAddIcon from '@material-ui/icons/PostAdd';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import useStyles from '../styles';


function AddBill(props) {
  const classes = useStyles();

  return (    
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.icon}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADD NEW BILL
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="descripion"
                  name="billDescription"
                  variant="outlined"
                  required
                  fullWidth
                  id="billDescription"
                  label="Description"
                  autoFocus
                />
             </Grid> 
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="cost"
                name="billCost"
                variant="outlined"
                required
                fullWidth
                id="billCost"
                label="Cost"
                autoFocus
              />
            </Grid> 
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Group</InputLabel>
                <Select
                  native
                  // value={state.age}
                  // onChange={handleChange}
                  label="Group"
                  inputProps={{
                  name: 'group',
                  id: 'outlined-group-native-simple',
                  }}
                >
                <option aria-label="None" value="" />
                <option value={10}>Roommates</option>
                <option value={20}>Road Trip</option>
                <option value={30}>Happy Hour</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Submit
          </Button>
         </form>
        </div>
      </Container>
  );
}

export default AddBill;