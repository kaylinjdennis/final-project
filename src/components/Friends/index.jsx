import React, { useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Toolbar,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import useApplicationData from "../../hooks/useApplicationData";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import useStyles from "../styles";

function Friends(props) {
  const classes = useStyles();
  const [friendEmail, setFriendEmail] = useState("");
  const {
    state,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
  } = useApplicationData();

  const friends = state.friends.map((friend) => {
    return (
      <ListItem key={friend.friend_info.id} className={classes.friend} button>
        <ListItemAvatar>
          <Avatar
            className={classes.friends1}
            alt={`Avatar n°${friend.friend_info.id}`}
            src={friend.friend_info.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          id={friend.friend_info.id}
          primary={friend.friend_info.name}
        />
      </ListItem>
    );
  });

  const friendRequests = state.friend_requests.map((friend) => {
    return (
      <ListItem key={friend.friend_info.id} className={classes.friendRequests}>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${friend.friend_info.id + 1}`}
            src={friend.friend_info.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          id={friend.friend_info.id}
          primary={friend.friend_info.name}
        />
        <div>
          <Button
            color="primary"
            size="small"
            type="submit"
            onClick={() => {
              acceptFriendRequest(friend.friend_info);
            }}
            variant="contained"
            className={classes.submit1}
            href={"/friends"}
          >
            Accept
          </Button>
          <Button
            color="primary"
            size="small"
            type="submit"
            onClick={() => {
              declineFriendRequest(friend.friend_info);
            }}
            variant="contained"
            className={classes.submit1}
            href={"/friends"}
          >
            Decline
          </Button>
        </div>
      </ListItem>
    );
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.icon}>
          <EmojiPeopleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Friends
        </Typography>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid item xs={12}>
            <br />
            <Toolbar>
              <form>
                <div className={classes.searchContainer}>
                  <PersonAddIcon className={classes.searchIcon} />
                  <TextField
                    className={classes.searchInput}
                    onChange={(event) => setFriendEmail(event.target.value)}
                    label="Send a friend request!"
                    variant="standard"
                  />
                  <Button
                    color="primary"
                    size="small"
                    type="submit"
                    onClick={() => {
                      sendFriendRequest(friendEmail);
                    }}
                    variant="contained"
                    className={classes.send}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Toolbar>
            <br />
            <br />
          </Grid>
          <Typography variant="h4">Your Friend Requests:</Typography>
          <List dense className={classes.friendRequests}>
            {friendRequests}
          </List>
          <br />
          <Typography variant="h4" className={classes.header}>
            Friends List:
          </Typography>
          <List dense>{friends}</List>
        </Grid>
      </div>
    </Container>
  );
}

export default Friends;
