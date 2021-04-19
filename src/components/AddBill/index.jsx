import {React, useState} from 'react';
import { Typography, Button, Container, TextField, List, ListItem, ListItemText, Checkbox, ListItemIcon, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PostAddIcon from '@material-ui/icons/PostAdd';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import useStyles from '../styles';
import { bgcolor, color } from '@material-ui/system';



import useApplicationData from '../../hooks/useApplicationData'

function AddBill(props) {
	const { state, createBill } = useApplicationData();
	const [description, setDescription] = useState('');
	const [cost, setCost] = useState(0);
	const [groupId, setGroupId] = useState(undefined);
	const [includeSelf, setIncludeSelf] = useState(0);

	const classes = useStyles();

	const handleClick = (event) => {
		console.log('includeSelf', includeSelf)
		createBill(cost, description, groupId, includeSelf)
	}

	const handleToggle = () => {
		if (includeSelf) {
			setIncludeSelf(0)
		} else {
			setIncludeSelf(1)
		}
		
	};

	const groups = state.groups.map(group => {
		return (
			<option value={group.id} > {group.name} </option>
		);
		});

  return (    
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.icon}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Bill
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
									onChange={(event) => setDescription(event.target.value)}
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
								onChange={(event) => setCost(event.target.value)}
              />
            </Grid> 
            <br></br>
            <Grid container spacing={1} direction='row'className={classes.groupSelfCheck} >
							<Grid item xs={6} >
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-group-native-simple" >Group</InputLabel>
                  <Select
                    native
                    // value={state.groups}
                    label="Group"
                    inputProps={{
                      name: 'group',
                      id: 'outlined-group-native-simple',
									  }}
									  onChange={(event) => setGroupId(event.target.value)}
                  >
                    <option aria-label="None" value="" />
								      {groups}
                  </Select>
                </FormControl>
              </Grid>
          
					    <Grid item xs={6} >
                <Box  color="primary.main">
                  <ListItem  key={1} button >
                    <ListItemIcon className={classes.formControl}  >
                    <Checkbox
                      edge="end"
                      onChange={() => {handleToggle()}}
                      checked={includeSelf}
                      inputProps={{ 'aria-labelledby': 'checkbox-list-secondary-label-1' }}
                      color="primary"
                    />
                    </ListItemIcon>
                    <ListItemText className={classes.formControl} id={1} primary="Include Yourself?"/>
                  </ListItem>
                </Box>
					    </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
              href={"/profile"}
            >
              Submit
            </Button>
          </Grid>
         </form>
        </div>
      </Container>
  );
}

export default AddBill;