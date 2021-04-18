import {React, useState} from 'react';
import { Typography, Button, Container, TextField, List, ListItem, ListItemText, Checkbox, ListItemIcon } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PostAddIcon from '@material-ui/icons/PostAdd';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import useStyles from '../styles';



import useApplicationData from '../../hooks/useApplicationData'

function EditBill(props) {
	const billID = props.match.params.id;

	const { state, editBill } = useApplicationData();
	const [description, setDescription] = useState('');
	const [cost, setCost] = useState(0);
	const [includeSelf, setIncludeSelf] = useState(0);

	const classes = useStyles();

	const bill = state.bills.posted.filter((bill) => bill.id === Number(billID));

	const handleClick = (event) => {
		console.log('includeSelf', includeSelf)
		editBill(billID, cost, description, bill[0].group_id, includeSelf)
	}

	const handleToggle = () => {
		if (includeSelf) {
			setIncludeSelf(0)
		} else {
			setIncludeSelf(1)
		}
	};

  return (    
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.icon}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Bill
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
					<Grid>
						<ListItem key={1} button>
					<ListItemIcon>
					<Checkbox
						edge="end"
						onChange={() => {handleToggle()}}
						checked={includeSelf}
						inputProps={{ 'aria-labelledby': 'checkbox-list-secondary-label-1' }}
						color="primary"
					/>
					</ListItemIcon>
					<ListItemText id={1} primary="Include Yourself?" />
				</ListItem>
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
         </form>
        </div>
      </Container>
  );
}

export default EditBill;