import React from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
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
		<BrowserRouter>
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
				<Link to="/profile" >
					<Button variant="contained" color="primary" className={classes.button}>
					Profile
				</Button>
				</Link>
				<Link to="/addbill">
				<Button variant="contained" color="primary" className={classes.button}>
					New Bill
				</Button>
				</Link>
				<Link to="/creategroup">
				<Button variant="contained" color="primary" className={classes.button}>
					Create Group
				</Button>
				</Link>
				<Link to="/friends">
				<Button variant="contained" color="primary" className={classes.button}>
					Add Friends
				</Button>
				</Link>
			</Grid>   
		</Grid> 

				<Route exact path='/' />
        <Route path='/addbill' component={AddBill} />
        <Route path='/profile' component={Profile} />
				<Route path='/creategroup' component={CreateGroup} />
				<Route path='/friends' component={Friends} />
		</BrowserRouter>
		</>
	);
}

export default App;


// endIcon={<Icon>send</Icon>}
//for later, if we want to add icons inside the buttons, or just use images maybe