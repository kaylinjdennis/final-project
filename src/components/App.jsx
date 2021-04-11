import React from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import { CssBaseline, Grid, Button } from '@material-ui/core';


import useStyles from './styles'

import Navbar from './Navbar'
import CreateGroup from './CreateGroup'
import AddBill from './AddBill'
import Friends from './Friends'
import Profile from './Profile'

function App() {
	const classes = useStyles();

	return (
		<>
		<CssBaseline />
		<Navbar />

		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justify="space-around"
			style={{ minHeight: '90vh' }}
		>
			<Grid item xs={6}>
				<Button variant="contained" color="primary" className={classes.button}
					// endIcon={<Icon>send</Icon>}
				>
					Profile
				</Button>
				<Button variant="contained" color="primary" className={classes.button}
					// endIcon={<Icon>send</Icon>}
				>
					New Bill
				</Button>
				<Button variant="contained" color="primary" className={classes.button}
					// endIcon={<Icon>send</Icon>}
				>
					Create Group
				</Button>
				<Button variant="contained" color="primary" className={classes.button}
					// endIcon={<Icon>send</Icon>}
				>
					Add Friends
				</Button>
			</Grid>   
		</Grid> 
		</>
	);
}

export default App;
