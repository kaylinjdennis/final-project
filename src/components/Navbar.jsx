import React from 'react';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import { Receipt, Share } from '@material-ui/icons';


function Navbar() {
	return (
		<>
		<AppBar position="relative">
			<Toolbar>
				<Receipt/>			
				<Typography variant="h5" align="center" justify="center">Bill Share </Typography>
				<Share/>
			</Toolbar>
		</AppBar>
		</>
	);
}

export default Navbar;
