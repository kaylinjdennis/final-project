import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import { Receipt, Share } from '@material-ui/icons';


function Navbar() {
	return (
		<>
		<AppBar position="relative">
			<Toolbar>
				<Receipt/>			
        <Link to="/">
				{/* <Typography variant="h5" align="center" justify="center">Bill Share </Typography> */}
        <Button variant="contained" color="primary">Bill Share</Button>
        </Link>
				<Share/>
			</Toolbar>
		</AppBar>
		</>
	);
}

export default Navbar;
