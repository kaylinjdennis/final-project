import React from 'react';
import { Typography, Button, Container, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import useStyles from '../styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


function CreateGroup(props) {

    const classes = useStyles();

    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    return (    
        <Container component="main" maxWidth="xs" >
          <div className={classes.paper}>
            <Avatar className={classes.icon}>
              <GroupAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Group
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="groupName"
                    name="groupName"
                    variant="outlined"
                    required
                    fullWidth
                    id="groupName"
                    label="Group Name"
                    autoFocus
                  />
               </Grid> 

              <Grid item xs={12} sm={12} className={classes.groupForm}>
                <Typography component="h1" variant="subtitle1">
                  Add friend(s) to group:
                </Typography>

                <List dense className={classes.root}>
                  {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem key={value} button>
                        <ListItemIcon>
                        <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Friend ${value + 1}`} />
                        <ListItemAvatar>
                             <Avatar className={classes.friends}
                                alt={`Avatar n°${value + 1}`}
                                src="https://i.pravatar.cc/300"
                            />
                        </ListItemAvatar>
                      </ListItem>
                    );
                  })}
                </List>
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

export default CreateGroup;