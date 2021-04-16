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

import useApplicationData from '../../hooks/useApplicationData';

import { useState } from 'react';
import { PersonalVideo } from '@material-ui/icons';

function CreateGroup(props) {
		const { state, createGroup } = useApplicationData()
		const [groupName, setGroupName] = useState('');
		const [members, setMembers] = useState([]);

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
			if (!members.includes(value)) {
				setMembers(prev => [...prev, value]);
			}
		};

		const friends = state.friends.map(friend => {
			const labelId = `checkbox-list-secondary-label-${friend.friend_info.id}`;
			return (
				<ListItem key={friend.friend_info.id} button>
					<ListItemIcon>
					<Checkbox
						edge="end"
						onChange={handleToggle(friend.friend_info.id)}
						checked={checked.indexOf(friend.friend_info.id)}
						inputProps={{ 'aria-labelledby': labelId }}
					/>
					</ListItemIcon>
					<ListItemText id={labelId} primary={friend.friend_info.name} />
					<ListItemAvatar>
						<Avatar className={classes.friends}
							alt={`Avatar n°${friend.friend_info.id + 1}`}
							src="https://i.pravatar.cc/300"
						/>
					</ListItemAvatar>
				</ListItem>
			);
		});


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
										onChange={(event) => setGroupName(event.target.value)}
                  />
               </Grid> 
              <Grid item xs={12} sm={12} className={classes.groupForm}>
                <Typography component="h1" variant="subtitle1">
                  Add friend(s) to group:
                </Typography>
                <List dense className={classes.root}>
                  {friends}
                </List>
              </Grid> 
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
							className={classes.submit}
							onClick={() => {createGroup(groupName, members)}}
            >
              Submit
            </Button>
           </form>
          </div>
        </Container>
    );
}

export default CreateGroup;