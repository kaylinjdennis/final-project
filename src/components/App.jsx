import React from 'react';
import { Typography, CssBaseline, AppBar, Toolbar } from '@material-ui/core';
import { Receipt, Share } from '@material-ui/icons';


function App() {
	return (
		<>
		<CssBaseline />
		<AppBar position="relative">
			<Toolbar>
				<Receipt />			
				<Typography variant="h5">Bill Share </Typography>
				<Share />
			</Toolbar>
		</AppBar>
		</>
	);
}

export default App;
