import React from 'react';
import { Typography, CssBaseline, AppBar, Toolbar, Grid, Box, Button, Icon, makeStyles } from '@material-ui/core';
import { Receipt, Share } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {
	const classes = useStyles();

	return (
		<>
		<CssBaseline />
		<AppBar position="relative">
			<Toolbar>
				<Receipt/>			
				<Typography variant="h5" align="center" justify="center">Bill Share </Typography>
				<Share/>
			</Toolbar>
		</AppBar>

		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justify="center"
			style={{ minHeight: '90vh' }}
		>

		<Grid item xs={3}>
		<Button
				variant="contained"
				size="large"
        color="primary"
        className={classes.button}
        // endIcon={<Icon>send</Icon>}
      >
        Profile
      </Button>
			<Button
				variant="contained"
				size="large"
        color="primary"
        className={classes.button}
        // endIcon={<Icon>send</Icon>}
      >
        New Bill
      </Button>
			<Button
				variant="contained"
				size="large"
        color="primary"
        className={classes.button}
        // endIcon={<Icon>send</Icon>}
      >
        Create Group
      </Button>
			<Button
				variant="contained"
				size="large"
        color="primary"
        className={classes.button}
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
