import React from 'react';
import { Typography, CssBaseline, AppBar, Toolbar, Grid, Box } from '@material-ui/core';
import { Receipt, Share } from '@material-ui/icons';


function App() {
	return (
		<>
		<CssBaseline />
		<AppBar position="relative">
			<Toolbar>
				{/* <Receipt align="center"/>			 */}
				<Typography variant="h5" align="center">Bill Share </Typography>
				{/* <Share align="center"/> */}
			</Toolbar>
		</AppBar>


		<Grid container justify = "center">
		<Box m="auto">
		<Typography variant="h5">Profile</Typography>
		<Typography variant="h5">New Bill</Typography>
		<Typography variant="h5">Create Group</Typography>
		<Typography variant="h5">Add Friends</Typography>
			
		</Box>
		</Grid>
		{/* <Box m="auto">
			<Box m="auto">
		<Typography variant="h5">Profile</Typography>
		<Typography variant="h5">New Bill</Typography>
		<Typography variant="h5">Create Group</Typography>
		<Typography variant="h5">Add Friends</Typography>
			</Box>
		</Box> */}


		</>
	);
}

export default App;
