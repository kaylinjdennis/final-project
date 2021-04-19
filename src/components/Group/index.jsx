import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Toolbar, TextField, Button, List, ListItem, ListItemText, Avatar, ListItemAvatar } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles'
import useApplicationData from '../../hooks/useApplicationData';

const useStyles = makeStyles((theme) => ({
	submit: {
		margin: "5px",
		width: "50px",
		height: "20px",
		fontSize: "12px"
	},
	send: {
		height: "30px",
		marginTop: "20px",
		marginLeft: "5px"
	},
	friends: {
		justifyContent: "center"
	},
	friend: {
		width: "350px"
	},
	friendRequests: {
		justifyContent: "space-between",
		width: "100%"
	},
	header: {
		width: "98%",
		justifyContent: "left"
	}
}));

function Group(props) {
	const classes = useStyles();
	const { state } = useApplicationData()

	const groupID = props.match.params.id;
	const group = state.groups.filter((group) => group.id === Number(groupID));

	let members = [];
	if (state.group_members.length !== 0) {
		members = state.group_members.data.map(member => {
			if (member.user_id !== Number(state.user_id)) {
				const friend = state.friends.filter(friend => friend.friend_info.id === member.user_id)
				if (friend.length !== 0) {
					return (
					<ListItem key={member.user_id} className={classes.friend} button>
						<ListItemAvatar>
							<Avatar className={classes.friends}
								alt={`Avatar n°${member.user_id}`}
								src={friend[0].friend_info.avatar}
							/>
						</ListItemAvatar>
						<ListItemText id={member.user_id} primary={friend[0].friend_info.name} />
					</ListItem>
					);	
				}
			}
		});
	}

  return (
		<>
		{(group.length === 0 || state.group_members.length === 0) && 
			<Typography variant="h5">
				Loading
			</Typography>
		}
		{(group.length !== 0 && state.group_members.length !== 0) &&
    <>
      <Container component="main" maxWidth="xs" >

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
        >

        <Grid item xs={12}>
          <br />
        
        <br />
          </Grid> 
          <Typography variant="h4">Group: {group[0].name}</Typography>  
          <br />
          <Typography variant="h6" >Friends in Group</Typography>  
          <List dense className={classes.friends}>
            {members}
          </List>
        </Grid> 
      </Container>
    </>
		}
</>
  );
}

export default Group;