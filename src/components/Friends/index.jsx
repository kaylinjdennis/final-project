import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Toolbar, TextField, Button, List, ListItem, ListItemText, Avatar, ListItemAvatar } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import useApplicationData from '../../hooks/useApplicationData';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
		marginBottom: "5px",
		marginRight: "5px"
  },
  searchInput: {
    width: "200px",
    margin: "5px",
	},
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
		justifyContent: "left",
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

function Friends(props) {
  const classes = useStyles();
  const [friendEmail, setFriendEmail] = useState("");
	const { state, sendFriendRequest, acceptFriendRequest } = useApplicationData()

	const friends = state.friends.map(friend => {
		return (
			<ListItem key={friend.friend_info.id} className={classes.friend} button>
				<ListItemAvatar>
					<Avatar className={classes.friends}
						alt={`Avatar n°${friend.friend_info.id}`}
						src={friend.friend_info.avatar}
					/>
				</ListItemAvatar>
				<ListItemText id={friend.friend_info.id} primary={friend.friend_info.name} />
			</ListItem>
		);
	});

	const friendRequests = state.friend_requests.map(friend => {
		return (
			<ListItem key={friend.friend_info.id} className={classes.friendRequests}>
					<ListItemAvatar>
					<Avatar 
						alt={`Avatar n°${friend.friend_info.id + 1}`}
						src={friend.friend_info.avatar}
					/>
					</ListItemAvatar>
					<ListItemText id={friend.friend_info.id} primary={friend.friend_info.name} />
				<div>
					<Button color="primary" size="small" type="submit" onClick={() => {acceptFriendRequest(friend.friend_info)}} variant="contained" className={classes.submit}>Accept</Button>
					<Button color="primary" size="small" type="submit" onClick={() => {acceptFriendRequest(friend.friend_info)}} variant="contained" className={classes.submit}>Decline</Button>
				</div>
				</ListItem>
		);
	});

  return (
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
        <Toolbar>
          <form>
          <div className={classes.searchContainer}>
            <PersonAddIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={(event) => setFriendEmail(event.target.value)}
              label="Search for a friend!"
              variant="standard"
            />
          <Button color="primary" size="small" type="submit" onClick={() => {sendFriendRequest(friendEmail)}} variant="contained" className={classes.send} >Submit</Button>
          </div>
          </form>
        </Toolbar>
        <br />
        {/* <div>
          <Typography variant="h4">Results: </Typography>
          <Typography>*</Typography>
        </div> */}
        <br />
          </Grid> 
          <Typography variant="h4">Your Friend Requests:</Typography>  
					<List dense className={classes.friendRequests}>
            {friendRequests}
          </List>
          <br />
          <Typography variant="h4" className={classes.header}>Friends List:</Typography>  
          <List dense >
            {friends}
          </List>
        </Grid> 
      </Container>
    </>
  );
}

export default Friends;