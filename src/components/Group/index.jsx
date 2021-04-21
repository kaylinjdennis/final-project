import React from 'react';
import useApplicationData from '../../hooks/useApplicationData';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
import useStyles from "../styles";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

function Group(props) {
  const classes = useStyles();
  const { state } = useApplicationData();

  const groupID = props.match.params.id;
  const group = state.groups.filter((group) => group.id === Number(groupID));

  let members = [];
  if (state.group_members.length !== 0) {
    members = state.group_members.data.map((member) => {
      if (member.user_id !== Number(state.user_id)) {
        const friend = state.friends.filter(
          (friend) => friend.friend_info.id === member.user_id
        );
        if (friend.length !== 0) {
          return (
            <ListItem key={member.user_id} className={classes.friend} button>
              <ListItemAvatar>
                <Avatar
                  className={classes.friends}
                  alt={`Avatar n°${member.user_id}`}
                  src={friend[0].friend_info.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                id={member.user_id}
                primary={friend[0].friend_info.name}
              />
            </ListItem>
          );
        }
      }
    });
  }

  return (
		<>
		{(group.length === 0 || state.group_members.length === 0) && (
        <div
					style={{
					position: 'absolute', 
					left: '50%', 
					top: '30%',
					transform: 'translate(-50%, -50%)'
					}}
				> 
					<br>
					</br>
					<Typography variant="h6" color="primary">
					LOADING
					</Typography>
					<CircularProgress/>
				</div>
		)}

		{(group.length !== 0 && state.group_members.length !== 0) && (
    		<>
					<Container component="main" maxWidth="xs" >
            <div className={classes.paper}>
              <Avatar className={classes.icon}>
                <SupervisedUserCircleIcon />
              </Avatar>
					  	<Grid
							  container
							  spacing={0}
							  direction="column"
							  alignItems="center"
						  >
						    <Grid item xs={12} >              
							    <br />							
							  </Grid> 
                <Grid container alignItems="center" item xs={12} sm={12} justify="center">
							    <Typography variant="h5" style={{ marginRight: 10}}>GROUP: </Typography>  
                  <Typography  color="primary" variant="h5">
                    {group[0].name}
                  </Typography>
                </Grid>
							  <br />
							  <Typography variant="h6" >Friends in Group:
							  </Typography>  
                <br></br>
               <Grid>
							    <List  className={classes.friends} paddingLeft="50" >
								    {members}
							    </List>
                </Grid>
						  </Grid> 
            </div>
					</Container>
				</>
  		)}
    </>
  );
}

export default Group;
